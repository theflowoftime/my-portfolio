import axios, { isAxiosError } from "axios";
import { ZOOM_OAUTH_ENDPOINT } from "../constants";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const getToken = async () => {
  try {
    const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

    const request = await axios.post(
      ZOOM_OAUTH_ENDPOINT,
      new URLSearchParams({
        grant_type: "account_credentials",
        account_id: ZOOM_ACCOUNT_ID!,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = request.data;
    return { access_token, expires_in, error: null };
  } catch (error) {
    if (isAxiosError(error))
      console.error(
        "Error generating Zoom token:",
        error.response?.data || error.message
      );
    return { access_token: null, expires_in: null, error };
  }
};

/**
 * Set zoom access token with expiration in redis
 *
 * @param {Object} auth_object
 * @param {String} access_token
 * @param {int} expires_in
 */
const setToken = async ({
  access_token,
  expires_in,
}: {
  access_token: string | null;
  expires_in: number;
}) => {
  await redis.setex("access_token", expires_in, access_token);
};

/**
 * Middleware that checks if a valid (not expired) token exists in redis
 * If invalid or expired, generate a new token, set in redis, and append to http request
 */
export const tokenCheck = async () => {
  const redis_token: string | null = await redis.get("access_token");

  let token = redis_token;

  /**
   * Redis returns:
   * -2 if the key does not exist
   * -1 if the key exists but has no associated expire
   */
  if (!redis_token || ["-1", "-2"].includes(redis_token)) {
    const { access_token, expires_in, error } = await getToken();

    if (error) {
      throw error;
    }

    setToken({ access_token, expires_in });

    token = access_token;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
