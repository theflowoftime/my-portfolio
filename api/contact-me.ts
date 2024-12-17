import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildFormSchema } from "./../src/lib/zod-schemas";
import { FORM_RESPONSES } from "./_utils/constants";
import { sendMessage } from "./_utils/sanity-cms";
import { getVisitorInfo, storeIP, verifyIPRateLimit } from "./_utils/db_redis";
import { verifyCaptcha } from "./_utils/verify-google-recaptcha";
import { retrieveIp } from "./_utils/network";
import { MeetingPlatformFactory } from "./_utils/platforms";
import { errorHandler } from "./_utils/error";
import { isAxiosError } from "axios";

function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) return err.message;
  if (err instanceof Error) return err.message;
  return "An unknown error occurred";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const formName = req.query?.formName as keyof typeof FORM_RESPONSES;

  if (!formName || !(formName in FORM_RESPONSES)) {
    return errorHandler(res, "Invalid or missing formName", "error", "contact");
  }

  if (req.method !== "POST") {
    return errorHandler(res, null, "unauthorized", formName);
  }

  const { recaptchaToken, ...formData } = req.body;
  const ip = retrieveIp(req);

  const verifySchema = buildFormSchema(null, formName).safeParse(formData);

  try {
    if (verifySchema.error) throw verifySchema.error;

    if (!recaptchaToken) {
      return errorHandler(res, null, "recaptcha", formName);
    }

    const { success, score } = await verifyCaptcha(recaptchaToken);

    if (!success || score < 0.5) {
      return errorHandler(res, null, "recaptcha", formName);
    }

    const ipKey = `${FORM_RESPONSES[formName].ip_prefix}${ip}`;
    const lastMessageTimestamp = await verifyIPRateLimit(ipKey);

    if (lastMessageTimestamp) {
      return errorHandler(res, null, "rateLimit", formName);
    }

    let info, meeting, link, password;
    if (formName === "meet" && ip) {
      info = await getVisitorInfo(ip);
      if (formData.platform) {
        try {
          const platformHandler = MeetingPlatformFactory.getPlatform(
            formData.platform
          );
          meeting = await platformHandler.createMeeting(
            formData,
            info?.timezone
          );
          link = meeting.join_url;
          password = meeting.password;
        } catch (err) {
          const errorMessage = getErrorMessage(err);
          console.error(`Error generating join URL: ${errorMessage}`, {
            formData,
            error: err,
          });
          return errorHandler(res, errorMessage, "error", formName);
        }
      }
    }

    await storeIP(ipKey);
    await sendMessage(
      { ...formData, userInfo: info, link, password },
      FORM_RESPONSES[formName]._type
    );

    return errorHandler(res, null, "success", formName);
  } catch (error) {
    console.error("Unhandled error occurred", error);
    return errorHandler(res, null, "error", formName);
  }
}
