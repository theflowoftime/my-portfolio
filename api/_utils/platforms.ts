import axios from "axios";
import { tokenCheck } from "./zoom/token";
import { ZOOM_API_BASE_URL } from "./constants";
import { isValid } from "date-fns";
import { Data } from "api/types";

const EMAIL = "daflowoftime@outlook.com";

function formatStartTime(date: Date | undefined, time: string | undefined) {
  if (!date || !time) return null;
  // Combine date and time into a full ISO 8601 string
  const startDateTime = new Date(`${date}T${time}:00`);

  if (!isValid(startDateTime)) {
    throw new Error(
      "Invalid date or time format. Please use yyyy-MM-dd for date and HH:mm for time."
    );
  }

  return startDateTime.toISOString(); // Ensures it is in UTC
}

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
      url: `${ZOOM_API_BASE_URL}/users/${EMAIL}/meetings`,
      headers,
      data: {
        agenda: "My Meeting",
        duration: 60,
        pre_schedule: true,
        // schedule_for: email,
        start_time: formatStartTime(date, time), // yyyy-MM-ddTHH:mm:ss
        timezone,
        topic: "My Meeting",
        type: 2,
        settings: {
          meeting_invitees: [
            {
              email,
              registrants_confirmation_email: true,
              registrants_email_notification: true,
            },
          ],
        },
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
