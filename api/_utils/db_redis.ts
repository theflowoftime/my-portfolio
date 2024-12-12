import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const verifyIPRateLimit = async (ipKey: string) => {
  try {
    return await redis.get(ipKey);
  } catch (error) {
    console.error("Error retrieving the ip from the database:", error);
    throw new Error("Failed to retrieve the ip from the database");
  }
};

export const storeIP = async (ipKey: string) => {
  try {
    return await redis.setex(ipKey, 3600, Date.now().toString());
  } catch (error) {
    console.error("Error storing ip in the database:", error);
    throw new Error("Failed to store ip in the database");
  }
};
