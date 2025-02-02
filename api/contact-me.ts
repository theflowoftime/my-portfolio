import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildFormSchema } from "./../src/lib/zod-schemas";
import { FORM_RESPONSES } from "./_utils/constants";
import { sendMessage } from "./_utils/sanity-cms";
import {
  getVisitorInfo,
  MAX_ATTEMPTS,
  storeIP,
  verifyIPRateLimit,
} from "./_utils/db_redis";
import { verifyCaptcha } from "./_utils/verify-google-recaptcha";
import { retrieveIp } from "./_utils/network";
import { MeetingPlatformFactory } from "./_utils/platforms";
import { errorHandler } from "./_utils/error";
import { getErrorMessage } from "./_utils/get-error-message";
import { formatStartTime } from "./_utils/utils";

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
    const attemptedCount = await verifyIPRateLimit(ipKey);

    if (attemptedCount !== null) {
      let expiration;
      if (Number(attemptedCount) >= MAX_ATTEMPTS) {
        // final rate limit reached
        expiration = await storeIP(ipKey, MAX_ATTEMPTS, true); // Ban IP for 24 hours
        return errorHandler(res, null, "rateLimit", formName);
      }

      expiration = await storeIP(ipKey, attemptedCount + 1);
      console.log(expiration / 60, "minutes remaining for", ipKey);
      return errorHandler(res, null, "rateLimit", formName);
    }

    let info, meeting, link, password, start_time;
    if (formName === "meet" && ip) {
      info = await getVisitorInfo(ip);
      if (formData.platform) {
        if (formData.platform === "other") {
          link = formData.link;
          password = formData.password;
          start_time = formatStartTime(formData.date, formData.time);
        } else {
          try {
            const platformHandler = MeetingPlatformFactory.getPlatform(
              formData.platform
            );
            meeting = await platformHandler.createMeeting(
              formData,
              info?.timezone
            );

            if (formData.platform === "zoom") {
              link = meeting.join_url;
              password = meeting.password;
              start_time = meeting.start_time;
            } else if (formData.platform === "google meet") {
              link = meeting.htmlLink;
              start_time = meeting.start.dateTime;
            } else if (formData.platform === "microsoft teams") {
              link = meeting.onlineMeetingUrl;
              start_time = meeting.start.dateTime;
            }
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
    }

    await storeIP(ipKey, 1);
    await sendMessage(
      { ...formData, userInfo: info, meeting: { password, start_time, link } },
      FORM_RESPONSES[formName]._type
    );

    return errorHandler(res, null, "success", formName, {
      link,
      password,
    });
  } catch (error) {
    console.error("Unhandled error occurred", error);
    return errorHandler(res, null, "error", formName);
  }
}
