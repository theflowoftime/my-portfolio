import axios, { isAxiosError } from "axios";
import { tokenCheck } from "./zoom/token";
import { Data } from "api/types";
import {
  formatGoogleMeetEndTime,
  formatGoogleMeetStartTime,
  formatStartTime,
} from "./utils";
import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";
import { ax } from "node_modules/@upstash/redis/zmscore-Dc6Llqgr.d.mts";

export type Meeting = any;
export type Conference = any;
interface MeetingPlatform {
  createMeeting(
    data: Data,
    timezone?: string
  ): Promise<Meeting | Conference | string | null>;
}

class ZoomPlatform implements MeetingPlatform {
  private readonly zoomAPIURL = "https://api.zoom.us/v2";
  private readonly email = "daflowoftime@outlook.com";
  private readonly topic = "My Meeting";
  private readonly duration = 40; // minutes
  private readonly agenda = "Discuss project";

  async createMeeting(
    { date, time }: Data,
    timezone: string
  ): Promise<any | null> {
    const headers = await tokenCheck();

    const options = {
      method: "POST",
      url: `${this.zoomAPIURL}/users/${this.email}/meetings`,
      headers,
      data: {
        agenda: this.agenda,
        duration: this.duration,
        pre_schedule: true,
        // schedule_for: email, // needs permission on behalf of another user meaning oauth2
        start_time: formatStartTime(date, time),
        timezone,
        topic: this.topic,
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
}

class GoogleMeetPlatform implements MeetingPlatform {
  private readonly requestId = crypto.randomBytes(12).toString("hex"); // Unique request ID generated once
  private readonly scopes = ["https://www.googleapis.com/auth/calendar"];
  private readonly googleTokenURL = "https://oauth2.googleapis.com/token";
  private readonly googleCalendarURL =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  private readonly duration = 1; // hours
  private readonly expiration = 3600; // 1 hour

  private getPrivateKey() {
    const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKeyBase64) {
      throw new Error(
        "Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable."
      );
    }

    const decodedKey = Buffer.from(serviceAccountKeyBase64, "base64").toString(
      "utf-8"
    );
    const tempKeyPath = "/tmp/service-account.json"; // Use a safe, temporary location
    fs.writeFileSync(tempKeyPath, decodedKey);

    return JSON.parse(decodedKey);
  }

  private generateJWT(serviceAccountKey: any) {
    const iat = Math.floor(Date.now() / 1000); // Current time in seconds
    const exp = iat + this.expiration; // 1-hour expiration

    const jwtToken = jwt.sign(
      {
        iss: serviceAccountKey.client_email, // Service account email
        scope: this.scopes.join(" "), // Scopes for Calendar API
        aud: this.googleTokenURL, // Audience
        exp,
        iat,
      },
      serviceAccountKey.private_key, // Service account private key
      { algorithm: "RS256" }
    );

    return jwtToken;
  }

  private async exchangeJWTForAccessToken(jwtToken: string) {
    const { data: tokenResponse } = await axios.post(this.googleTokenURL, {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwtToken,
    });

    return tokenResponse.access_token;
  }

  private createEvent(data: Data, timezone: string) {
    return {
      summary: "Meeting",
      description: "Discuss project.",
      start: {
        dateTime: formatGoogleMeetStartTime(data.date, data.time),
        timeZone: timezone,
      },
      end: {
        dateTime: formatGoogleMeetEndTime(data.date, data.time, this.duration),
        timeZone: timezone,
      },
      // attendees: [{ email: data.email }], // need domain-wide delegation which requires G Suite and domain verification
      conferenceData: {
        createRequest: {
          requestId: this.requestId,
          conferenceSolution: { key: { type: "hangoutsMeet" } },
        },
      },
    };
  }

  async createMeeting(
    data: Data,
    timezone: string
  ): Promise<Conference | null> {
    try {
      const serviceAccountKey = this.getPrivateKey();
      const jwtToken = this.generateJWT(serviceAccountKey);
      const accessToken = await this.exchangeJWTForAccessToken(jwtToken);
      const calendarEvent = this.createEvent(data, timezone);

      const response = await axios.post(
        `${this.googleCalendarURL}?conferenceDataVersion=1`, // Add conferenceDataVersion query parameter
        calendarEvent,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Event Created:", response.data);

      // provide read access to the user
      const r = await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/primary/acl`,
        {
          role: "reader",
          scope: {
            type: "user",
            value: data.email,
          },
        }
      );
      console.log("Event Created:", r.data);

      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        console.error(
          "Error creating Google Meet conference:",
          error.response?.data || error.message
        );
      throw error;
    }
  }
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  createMeeting(data: Data): Promise<string> {
    // Logic to generate a Microsoft Teams join URL
    return new Promise(() => {});
  }
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
