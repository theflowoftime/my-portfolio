import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildFormSchema } from "@/lib/zod-schemas";
import { verifyCaptcha } from "api/utils/verify-google-recaptcha";
import { CONTACT_FORM_RESPONSES } from "./utils/constants";
import { sendMessage } from "./utils/sanity";
import { storeIP, verifyIPRateLimit } from "./utils/redis";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    const { status, message } = CONTACT_FORM_RESPONSES["unauthorized"];
    return res.status(status).json(message);
  }

  const { recaptchaToken, ...formData } = req.body;

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress;

  const verifySchema = buildFormSchema().safeParse(formData);

  try {
    // Ensure formData matches schema
    if (verifySchema.error) throw verifySchema.error;

    // Ensure recaptchaToken exists
    if (!recaptchaToken) {
      const { status, message } = CONTACT_FORM_RESPONSES["recaptcha"];
      return res.status(status).json(message);
    }

    // Verify reCAPTCHA
    const { success, score } = await verifyCaptcha(recaptchaToken);

    if (!success || score < 0.5) {
      const { status, message } = CONTACT_FORM_RESPONSES["recaptcha"];
      return res.status(status).json(message);
    }

    // Rate limit check
    const ipKey = `contact-rate-limit:${ip}`;
    const lastMessageTimestamp = await verifyIPRateLimit(ipKey);

    if (lastMessageTimestamp) {
      const { status, message } = CONTACT_FORM_RESPONSES["rateLimit"];
      return res.status(status).json(message);
    }

    // Store IP and send message
    await storeIP(ipKey);
    await sendMessage(formData);

    // Success response
    const { status, message } = CONTACT_FORM_RESPONSES["success"];
    return res.status(status).json(message);
  } catch (error) {
    console.error("Error occurred:", error);
    const { status, message } = CONTACT_FORM_RESPONSES["error"];
    return res.status(status).json({
      message,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
