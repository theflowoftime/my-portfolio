import { Redis } from "@upstash/redis";
import { Info } from "api/types";

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
