import { Redis } from "@upstash/redis";
import { Info } from "api/types";

const redis = Redis.fromEnv({
  url: process.env.KV_REDIS_URL!, // Ensure REDIS_URL is set in your environment variables
  token: process.env.KV_KV_REST_API_TOKEN!, // Ensure REDIS_TOKEN is set in your environment variables
});
const BASE_RATE_LIMIT_WINDOW = 60 * 5; // 5 minutes
export const MAX_ATTEMPTS = 10;
const BAN_DURATION = 60 * 60 * 24; // 24 hours

export const verifyIPRateLimit = async (
  ipKey: string
): Promise<number | null> => {
  try {
    const count: string | null = await redis.get(ipKey);
    return count ? parseInt(count, 10) : null;
  } catch (error) {
    console.error("Error retrieving the ip from the database:", error);
    throw new Error("Failed to retrieve the ip from the database");
  }
};

export const storeIP = async (
  ipKey: string,
  count: number,
  ban: boolean = false
) => {
  try {
    const expiration = ban ? BAN_DURATION : BASE_RATE_LIMIT_WINDOW * count;
    await redis.setex(ipKey, expiration, count);
    return expiration;
  } catch (error) {
    console.error("Error storing ip in the database:", error);
    throw new Error("Failed to store ip in the database");
  }
};

export async function storeVisitorInfo(ipKey: string, info: Info) {
  try {
    return await redis.setex(ipKey, 3600, info);
  } catch (error) {
    console.error("Error storing visitor info in the database:", error);
    throw new Error("Failed to store visitor info in the database");
  }
}

export const getVisitorInfo = async (ip: string): Promise<Info | null> => {
  try {
    return await redis.get(ip);
  } catch (error) {
    console.error("Error retrieving the ip from the database:", error);
    throw new Error("Failed to retrieve the ip from the database");
  }
};
