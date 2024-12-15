import { MeetSchemaType } from "@/types/types";
import axios from "axios";
import { tokenCheck } from "./zoom/token";

const EMAIL = "daflowoftime@outlook.com";

type Data = Partial<MeetSchemaType>;

interface MeetingPlatform {
  generateJoinUrl(data: Data, timezone?: string): Promise<string | null>;
}

class ZoomPlatform implements MeetingPlatform {
  async generateJoinUrl(
    { email, date, time }: Data,
    timezone: string
  ): Promise<string | null> {
    const headers = await tokenCheck();

    // Logic to generate a Zoom join URL
    const options = {
      method: "POST",
      url: `https://api.zoom.us/v2/users/${EMAIL}/meetings`,
      headers,
      data: {
        agenda: "My Meeting",
        default_password: false,
        duration: 60,
        pre_schedule: true,
        // schedule_for: email,
        start_time: `${date}T${time}`, // yyyy-MM-ddTHH:mm:ss
        timezone,
        topic: "My Meeting",
        type: 2,
        meeting_invitees: [
          {
            email,
            registrants_confirmation_email: true,
          },
        ],
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Meeting Created:", data);
      return data.join_url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Zoom API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      return null;
    }
  }
}

class GoogleMeetPlatform implements MeetingPlatform {
  generateJoinUrl(data: Data): Promise<string> {
    // Logic to generate a Google Meet join URL
    return new Promise(() => {});
  }
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  generateJoinUrl(data: Data): Promise<string> {
    // Logic to generate a Microsoft Teams join URL
    return new Promise(() => {});
  }
}

export class MeetingPlatformFactory {
  static getPlatform(platform: string): MeetingPlatform {
    switch (platform) {
      case "zoom":
        return new ZoomPlatform();
      case "google-meet":
        return new GoogleMeetPlatform();
      case "microsoft-teams":
        return new MicrosoftTeamsPlatform();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
