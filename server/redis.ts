import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const verifyIPRateLimit = async (ipKey: string) =>
  await redis.get(ipKey);

export const storeIP = async (ipKey: string) =>
  await redis.setex(ipKey, 3600, Date.now().toString());
