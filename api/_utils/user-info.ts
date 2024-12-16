import { Language } from "@/types/types";
import { Info } from "api/types";
import axios from "axios";
import { FIELDS_NUMERIC } from "./constants";

export async function getUserInfo(ip: string, lang: Language): Promise<Info> {
  try {
    // Use HTTPS for secure communication TODO
    return (
      await axios.get(`http://ip-api.com/json/${ip}`, {
        params: { fields: FIELDS_NUMERIC, lang: lang.toLowerCase() },
      })
    ).data;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Error retrieving user info from ip-api:"
    );
    throw new Error("Failed to retrieve user data");
  }
}
