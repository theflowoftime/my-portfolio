import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildFormSchema } from "./../src/lib/zod-schemas";
import { FORM_RESPONSES } from "./_utils/constants";
import { sendMessage } from "./_utils/sanity-cms";
import { storeIP, verifyIPRateLimit } from "./_utils/db_redis";
import { verifyCaptcha } from "./_utils/verify-google-recaptcha";
import { retrieveIp } from "./_utils/network";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const formName = req.query?.formName as keyof typeof FORM_RESPONSES;
  // Ensure formName is provided and valid
  if (!formName) {
    return res.status(400).json({ message: "Invalid or missing formName" });
  }

  if (req.method !== "POST") {
    const { status, message } = FORM_RESPONSES[formName]["unauthorized"];
    return res.status(status).json({ message });
  }

  const { recaptchaToken, ...formData } = req.body;

  const ip = retrieveIp(req);

  const verifySchema = buildFormSchema(null, formName).safeParse(formData);

  try {
    // Ensure formData matches schema
    if (verifySchema.error) throw verifySchema.error;

    // Ensure recaptchaToken exists
    if (!recaptchaToken) {
      const { status, message } = FORM_RESPONSES[formName]["recaptcha"];
      return res.status(status).json({ message });
    }

    // Verify reCAPTCHA
    const { success, score } = await verifyCaptcha(recaptchaToken);

    if (!success || score < 0.5) {
      const { status, message } = FORM_RESPONSES[formName]["recaptcha"];
      return res.status(status).json({ message });
    }

    // Rate limit check
    const ipKey = `${FORM_RESPONSES[formName]["ip_prefix"]}${ip}`;
    const lastMessageTimestamp = await verifyIPRateLimit(ipKey);

    if (lastMessageTimestamp) {
      const { status, message } = FORM_RESPONSES[formName]["rateLimit"];
      return res.status(status).json({ message });
    }

    // Store IP and send message
    await storeIP(ipKey);
    await sendMessage(formData);

    // Success response
    const { status, message } = FORM_RESPONSES[formName]["success"];
    return res.status(status).json({ message });
  } catch (error) {
    const { status, message } = FORM_RESPONSES[formName]["error"];
    return res.status(status).json({
      message,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
