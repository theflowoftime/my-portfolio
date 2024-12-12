import { VercelRequest } from "@vercel/node";

export const retrieveIp = (req: VercelRequest) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
  req.socket.remoteAddress;
