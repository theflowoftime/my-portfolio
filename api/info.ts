import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import { getUserInfo } from "./_utils/external-user-info";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const ip = retrieveIp(req);
    if (!ip) {
      console.error("Unable to retrieve the user's IP address.");
      return res.status(400).json({ error: "Unable to retrieve data." });
    }
    // Fetch visitor profile
    const info = await getUserInfo(ip);
    return res.status(200).send({ info });
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
