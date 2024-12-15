import { VercelRequest, VercelResponse } from "@vercel/node";
import { retrieveIp } from "./_utils/network";
import { getUserInfo } from "./_utils/external-user-info";
import { storeVisitorInfo } from "./_utils/db_redis";
import { Language } from "@/types/types";
import { DEFAULT_LANG } from "./_utils/constants";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const lang = (req.query?.lang as Language) || DEFAULT_LANG;
    const ip = retrieveIp(req);
    if (!ip) {
      console.error("Unable to retrieve the user's IP address.");
      return res.status(400).json({ error: "Unable to retrieve data." });
    }
    // Fetch visitor profile
    const info = await getUserInfo(ip, lang);

    switch (info.status) {
      case "success":
        // store in redis for an hour
        await storeVisitorInfo(ip, info);
        break;
      case "fail":
        console.error(info.message);
        return res
          .status(400)
          .json({ status: info.status, error: info.message });
      default:
        break;
    }

    return res.status(200).send({
      status: info.status,
      info: {
        timezone: info.timezone,
        offset: info.offset,
        country: info.country,
        countryCode: info.countryCode,
        mobile: info.mobile,
        proxy: info.proxy,
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
