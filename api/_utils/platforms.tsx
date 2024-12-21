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
import { Redis } from "@upstash/redis";

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
  private readonly scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];
  private readonly googleTokenURL = "https://oauth2.googleapis.com/token";
  private readonly googleCalendarURL =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1";

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
      conferenceData: {
        createRequest: {
          requestId: this.requestId,
          conferenceSolution: {
            key: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    };
  }

  async createMeeting(
    data: Data,
    timezone: string
  ): Promise<Conference | null> {
    let accessToken: string | undefined;
    let eventId: string | undefined;
    try {
      const serviceAccountKey = this.getPrivateKey();
      const jwtToken = this.generateJWT(serviceAccountKey);
      accessToken = await this.exchangeJWTForAccessToken(jwtToken);
      const calendarEvent = this.createEvent(data, timezone);

      const eventResponse = await axios.post(
        this.googleCalendarURL,
        calendarEvent,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the Meet link from `conferenceData`
      const meetLink = eventResponse.data.conferenceData?.entryPoints?.find(
        (entry: any) => entry.entryPointType === "video"
      )?.uri;

      console.log("Meet Link:", meetLink);

      console.log("Event Created:", eventResponse);

      eventId = eventResponse.data.id; // Get the event ID

      // Now grant read access using ACL
      const aclResponse = await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/primary/acl`,
        {
          role: "owner",
          scope: {
            type: "user",
            value: data.email,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Event Created:", eventResponse.data);
      console.log("ACL updated:", aclResponse.data);

      return eventResponse.data;
    } catch (error) {
      // Handle errors appropriately.  If the event creation failed, there's nothing to clean up.  But if the event was created successfully and the ACL update failed, you should ideally delete the event to maintain consistency.
      console.error("Error creating meeting:", error);
      if (eventId && accessToken) {
        // attempt to delete the event if the ACL update failed, but consider retrying the ACL update in a production environment
        try {
          await axios.delete(`${this.googleCalendarURL}/${eventId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(`Event with ID ${eventId} deleted due to ACL failure`);
        } catch (deleteError) {
          console.error("Error deleting event:", deleteError);
        }
      }
      throw error; // re-throw for higher level handling
    }
  }
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  #tokenKey = "ms-access-token";
  #tenantId =
    process.env.MS_TENANT_ID! || "1ca2e233-fbc5-48b6-a49d-df215bfa96a7";
  #clientId = process.env.MS_CLIENT_ID!;
  #clientSecret = process.env.MS_CLIENT_SECRET!; // Replace with your client secret
  // #userId = process.env.MS_USER_ID!;
  // #tokenEndpoint = `https://login.microsoftonline.com/${
  //   this.#tenantId
  // }/oauth2/v2.0/token`;
  #tokenEndpoint = `https://login.microsoftonline.com/${
    this.#tenantId
  }/oauth2/v2.0/token`;
  #graphEndpoint = "https://graph.microsoft.com/v1.0";
  #redis = Redis.fromEnv();

  async #getAccessToken() {
    // Check if the token exists in Redis
    const cachedToken = await this.#redis.get(this.#tokenKey);
    if (cachedToken) {
      return cachedToken;
    }

    // Generate a new token if not found in Redis
    const tokenResponse = await axios.post(
      this.#tokenEndpoint,
      new URLSearchParams({
        client_id: this.#clientId,
        scope: "https://graph.microsoft.com/.default",
        client_secret: this.#clientSecret,
        grant_type: "client_credentials",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = tokenResponse.data;

    // Store the token in Redis with an expiration time
    await this.#redis.setex(this.#tokenKey, expires_in - 60, access_token); // Set a buffer to avoid expiration issues

    return access_token;
  }

  async #createOnlineMeeting(meetingData: any) {
    const token = await this.#getAccessToken();

    console.log({ token });
    const response = await axios.post(
      `${this.#graphEndpoint}/users/12a542e70b9f80a9/events`, //daflowoftime@outlook.com
      meetingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // "Accept-Language": data.locale,
        },
      }
    );

    return response.data.joinUrl;
  }

  async createMeeting(data: Data, timezone: string): Promise<string> {
    // Logic to generate a Microsoft Teams join URL
    const { email, date, time } = data;
    // const userId = "b50863e9-a9e1-4946-9daa-4e1a5ae6f366";

    const meetingData = {
      subject: "Discuss project",
      start: {
        dateTime: formatGoogleMeetStartTime(date, time),
        timeZone: timezone,
      },
      end: {
        dateTime: formatGoogleMeetEndTime(date, time, 1), // 1 hour meeting
        timeZone: timezone,
      },
      attendees: [
        {
          emailAddress: {
            address: email,
            name: "Partner",
          },
          type: "required",
        },
      ],
      isOnlineMeeting: true,
      onlineMeetingProvider: "teamsForBusiness",
      originalStartTimeZone: "Africa/Tunis",
      allowNewTimeProposals: true,
      isReminderOn: true,
    };

    try {
      const response = await this.#createOnlineMeeting(meetingData);
      console.log("Microsoft Teams meeting created:", response);
      return response;
    } catch (error) {
      if (isAxiosError(error))
        console.error(
          "Error creating online meeting:",
          error.response?.data || error.message
        );
      throw new Error("Failed to create Microsoft Teams meeting.");
    }
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
