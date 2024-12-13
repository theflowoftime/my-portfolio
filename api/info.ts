import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ip = retrieveIp(req);

  console.log(ip);

  return res.status(200).json({ ip });
}
