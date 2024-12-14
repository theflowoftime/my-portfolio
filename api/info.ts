import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import { getUserInfo } from "./_utils/external-user-info";
import { Info } from "@/types/types";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.INFO_SECRET_KEY;

export const encryptData = (data: Info) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY!
  ).toString();
  return encrypted;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const ip = retrieveIp(req);
    if (!ip) {
      console.error("Unable to retrieve the user's IP address.");
      return res.status(400).json({ error: "Unable to retrieve data." });
    }
    // Fetch visitor profile
    const info = await getUserInfo(ip);
    const encryptedVisitorInfo = encryptData(info);
    return res.status(200).send({ info: encryptedVisitorInfo });
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
