import { Info } from "api/types";
import axios from "axios";

export async function getUserInfo(ip: string): Promise<Info> {
  try {
    // Use HTTPS for secure communication TODO
    return (await axios.get(`http://ip-api.com/json/${ip}`)).data;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Error retrieving user info from ip-api:"
    );
    throw new Error("Failed to retrieve user data");
  }
}
