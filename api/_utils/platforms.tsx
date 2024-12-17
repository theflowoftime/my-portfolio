import axios from "axios";
import { tokenCheck } from "./zoom/token";
import { ZOOM_API_BASE_URL } from "./constants";
import { Data } from "api/types";
import { formatStartTime } from "./utils";

const EMAIL = "daflowoftime@outlook.com"; // add as env
type Meeting = any; // zoom meeting response

interface MeetingPlatform {
  createMeeting(data: Data, timezone?: string): Promise<Meeting | null>;
  generateConfirmationEmailData(
    data: Meeting,
    email: string,
    timeZone: string | undefined
  ): void;
}

class ZoomPlatform implements MeetingPlatform {
  async createMeeting(
    { email, date, time }: Data,
    timezone: string
  ): Promise<any | null> {
    const headers = await tokenCheck();

    // Logic to generate a Zoom join URL
    const options = {
      method: "POST",
      url: `${ZOOM_API_BASE_URL}/users/${EMAIL}/meetings`,
      headers,
      data: {
        agenda: "My Meeting",
        duration: 40,
        pre_schedule: true,
        // schedule_for: email,
        start_time: formatStartTime(date, time), // yyyy-MM-ddTHH:mm:ss
        timezone,
        topic: "My Meeting",
        type: 2,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Meeting Created:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Zoom API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      return null;
    }
  }

  generateConfirmationEmailData(
    { join_url, start_url, password, start_time }: Meeting,
    email: string,
    timeZone: string
  ) {
    if (!join_url || !start_time || !password) {
      console.error("Missing email details", {
        join_url,
        start_time,
        password,
      });
      throw new Error("Required email details are missing.");
    }

    // Prepare the email template
    const emailHtml = `
  <html>
    <body>
      <p>Hi,</p>
      <p>Your meeting is scheduled for ${new Date(
        start_time
      ).toLocaleString()}</p>
      <p>Your password: ${password}</p>
      <p><a href="${join_url}">Join the Meeting</a></p>
    </body>
  </html>
`;
  }
}

class GoogleMeetPlatform implements MeetingPlatform {
  createMeeting(data: Data): Promise<string> {
    // Logic to generate a Google Meet join URL
    return new Promise(() => {});
  }
  generateConfirmationEmailData() {}
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  createMeeting(data: Data): Promise<string> {
    // Logic to generate a Microsoft Teams join URL
    return new Promise(() => {});
  }

  generateConfirmationEmailData() {}
}

export class MeetingPlatformFactory {
  static getPlatform(platform: string): MeetingPlatform {
    switch (platform) {
      case "zoom":
        return new ZoomPlatform();
      case "google meet":
        return new GoogleMeetPlatform();
      case "microsoft teams":
        return new MicrosoftTeamsPlatform();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
