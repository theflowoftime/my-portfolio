import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import { getUserInfo } from "./_utils/external-user-info";
import { Redis } from "@upstash/redis";
import { Info } from "./types";

const redis = Redis.fromEnv();

async function storeInfo(ipKey: string, info: Info) {
  try {
    return await redis.setex(ipKey, 3600, info);
  } catch (error) {
    console.error("Error storing visitor info in the database:", error);
    throw new Error("Failed to store visitor info in the database");
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const ip = retrieveIp(req);
    if (!ip) {
      console.error("Unable to retrieve the user's IP address.");
      return res.status(400).json({ error: "Unable to retrieve data." });
    }
    // Fetch visitor profile
    const info = await getUserInfo(ip);

    // store in redis for an hour
    await storeInfo(ip, info);

    return res
      .status(200)
      .send({ info: { timezone: info?.timezone, country: info?.country } });
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again later.",
    });
  }
}
