import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import { getUserInfo } from "./_utils/external-user-info";
import { storeVisitorInfo } from "./_utils/db_redis";

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
    await storeVisitorInfo(ip, info);

    return res.status(200).send({
      info: {
        timezone: info?.timezone,
        country: info?.country,
        countryCode: info?.countryCode,
      },
    });
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
