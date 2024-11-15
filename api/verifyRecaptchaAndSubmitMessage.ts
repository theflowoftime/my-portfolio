import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const SANITY_WRITE_TOKEN = process.env.SANITY_PROJECT_TOKEN; // Store securely
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY; // reCAPTCHA secret key
const DATASET = process.env.VITE_SANITY_PROJECT_DATASET;
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID;

const redis = Redis.fromEnv();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { recaptchaToken, ...formData } = req.body;
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress;

  try {
    // Step 1: Verify reCAPTCHA with Google
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: recaptchaToken,
        },
      }
    );

    const { success, score } = recaptchaResponse.data;

    // Check reCAPTCHA score threshold (e.g., above 0.5 for valid human)
    if (!success || score < 0.5) {
      return res.status(403).json({
        message: "recaptcha",
      });
    }

    // Step 2: Rate Limit Check with Redis
    const ipKey = `contact-rate-limit:${ip}`;
    const lastMessageTimestamp = await redis.get(ipKey);

    if (lastMessageTimestamp) {
      return res.status(429).json({
        message: "rate-limit",
      });
    }

    // Store IP in Redis with a TTL of 1 hour (3600 seconds)
    await redis.setex(ipKey, 3600, Date.now().toString());

    // Step 3: Submit data to Sanity if reCAPTCHA check passes
    const sanityResponse = await axios.post(
      `https://${PROJECT_ID}.api.sanity.io/v1/data/mutate/${DATASET}`,
      {
        mutations: [
          {
            create: {
              _type: "message",
              ...formData,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        },
      }
    );

    // Respond to frontend with success
    return res.status(200).json({ message: "Message submitted successfully!" });
  } catch (error) {
    console.error("Error submitting message:", error);
    return res.status(500).json({ message: "message" });
  }
}
