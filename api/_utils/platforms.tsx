import axios, { isAxiosError } from "axios";
import { tokenCheck } from "./zoom/token";
import { ZOOM_API_BASE_URL } from "./constants";
import { Data } from "api/types";
import {
  formatGoogleMeetEndTime,
  formatGoogleMeetStartTime,
  formatStartTime,
} from "./utils";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const EMAIL = "daflowoftime@outlook.com"; // add as env
export type Meeting = any; // zoom meeting response
export type Conference = any;
const requestId = crypto.randomBytes(12).toString("hex"); // Unique request ID generated once

export const SCOPES = ["https://www.googleapis.com/auth/calendar"];
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

interface MeetingPlatform {
  createMeeting(data: Data, timezone?: string): Promise<Meeting | null>;
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
}

class GoogleMeetPlatform implements MeetingPlatform {
  async createMeeting(
    data: Data,
    timezone: string
  ): Promise<Conference | null> {
    // Logic to generate a Google Meet join URL
    try {
      // Check for the base64-encoded service account key in the environment
      const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKeyBase64) {
        throw new Error(
          "Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable."
        );
      }

      // Decode the base64 string and write to a temporary file
      const decodedKey = Buffer.from(
        serviceAccountKeyBase64,
        "base64"
      ).toString("utf-8");
      const tempKeyPath = "/tmp/service-account.json"; // Use a safe, temporary location
      fs.writeFileSync(tempKeyPath, decodedKey);

      // Parse the service account key JSON
      const serviceAccountKey = JSON.parse(decodedKey);

      // Step 1: Create a JWT for Service Account Authentication
      const iat = Math.floor(Date.now() / 1000); // Current time in seconds
      const exp = iat + 3600; // 1-hour expiration

      const jwtToken = jwt.sign(
        {
          iss: serviceAccountKey.client_email, // Service account email
          scope: SCOPES.join(" "), // Scopes for Calendar API

          aud: GOOGLE_TOKEN_URL, // Audience
          exp,
          iat,
        },
        serviceAccountKey.private_key, // Service account private key
        { algorithm: "RS256" }
      );

      // Step 2: Exchange JWT for an Access Token
      const { data: tokenResponse } = await axios.post(GOOGLE_TOKEN_URL, {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken,
      });

      const accessToken = tokenResponse.access_token;

      const DURATION = 1; // hours
      // Step 3: Create a Calendar Event with a Google Meet Link
      const calendarEvent = {
        summary: "Meeting",
        description: "Discuss project.",
        start: {
          dateTime: formatGoogleMeetStartTime(data.date, data.time), // change to Date
          timeZone: timezone,
        },
        end: {
          dateTime: formatGoogleMeetEndTime(data.date, data.time, DURATION), // Replace with your date/time
          timeZone: timezone,
        },
        // attendees: [{ email: data.email }],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolution: { key: { type: "hangoutsMeet" } }, // Google Meet
          },
        },
      };

      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
        calendarEvent,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Meet Link:", response.data.hangoutLink);
      console.log("Event Created:", response.data);
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
