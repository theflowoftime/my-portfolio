import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ip = retrieveIp(req);

  // Fetch visitor profile
  const info = (await axios.get(`http://ip-api.com/json/${ip}`)).data;

  return res.status(200).json({ info });
}
