import { MeetSchemaType } from "@/types/types";
import axios from "axios";

const ZOOM_SECRET_TOKEN = process.env.ZOOM_SECRET_TOKEN;

type Payload = Partial<MeetSchemaType> & { timezone: string };

interface MeetingPlatform {
  generateJoinUrl(payload: Payload): Promise<string | null>;
}

class ZoomPlatform implements MeetingPlatform {
  async generateJoinUrl({
    email,
    date,
    time,
    timezone,
  }: Payload): Promise<string | null> {
    // Logic to generate a Zoom join URL
    const options = {
      method: "POST",
      url: "https://api.zoom.us/v2/users/me/meetings",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ZOOM_SECRET_TOKEN}`,
      },
      payload: {
        agenda: "My Meeting",
        default_password: false,
        duration: 60,
        pre_schedule: true,
        schedule_for: email,
        start_time: `${date}T${time}`, // yyyy-MM-ddTHH:mm:ss
        timezone: timezone,
        topic: "My Meeting",
        type: 2,
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      return data.join_url;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}

class GoogleMeetPlatform implements MeetingPlatform {
  generateJoinUrl(payload: Payload): Promise<string> {
    // Logic to generate a Google Meet join URL
    return new Promise(() => {});
  }
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  generateJoinUrl(payload: Payload): Promise<string> {
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