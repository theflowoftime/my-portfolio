import axios from "axios";
import { tokenCheck } from "./zoom/token";
import { ZOOM_API_BASE_URL } from "./constants";
import { Data } from "api/types";
import { formatStartTime } from "./utils";

const EMAIL = "daflowoftime@outlook.com";
const LOCALE = "en-US";

type Meeting = any; // zoom meeting response

interface MeetingPlatform {
  createMeeting(data: Data, timezone?: string): Promise<Meeting | null>;
  sendConfirmationEmail(
    data: Meeting,
    email: string,
    timeZone: string | undefined
  ): void;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY!;

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

  async sendConfirmationEmail(
    {
      join_url,
      start_url,
      status,
      password,
      encrypted_password,
      pstn_password,
      h323_password,
      start_time,
    }: Meeting,
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

    // Render the email HTML
    // const emailtemplate = (
    //   <EmailTemplate
    //     joinUrl={join_url}
    //     startTime={new Date(start_time).toLocaleString(LOCALE, {
    //       timeZone: timeZone || "UTC",
    //     })}
    //     password={password}
    //     timeZone={timeZone || "UTC"}
    //   />
    // );

    // Prepare the email template
    const emailHtml = `
  <html>
    <body>
      <p>Hi,</p>
      <p>Your meeting is scheduled for ${new Date(start_time).toLocaleString()}</p>
      <p>Your password: ${password}</p>
      <p><a href="${join_url}">Join the Meeting</a></p>
    </body>
  </html>
`;

    console.log(RESEND_API_KEY);

    try {
      const response = await axios.post("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: {
          from: `YK <${EMAIL}>`,
          to: email,
          subject: "Your Meeting Confirmation",
          html: emailHtml,
        },
      });

      // const { data, error } = await resend.emails.send({
      //   from: EMAIL,
      //   to: [email],
      //   subject: "Your Meeting Confirmation",
      //   // html: "<strong>works</strong>",
      //   react: EmailTemplate({
      //     joinUrl: join_url,
      //     startTime: new Date(start_time).toLocaleString(LOCALE, {
      //       timeZone: timeZone || "UTC",
      //     }),
      //     password,
      //     timeZone: timeZone || "UTC",
      //   }),
      // });
      // console.info("Email sent", { recipient: email, joinUrl: join_url });

      // if (error) {
      //   console.error(error);
      //   throw error;
      // }

      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send confirmation email.");
    }
  }
}

class GoogleMeetPlatform implements MeetingPlatform {
  createMeeting(data: Data): Promise<string> {
    // Logic to generate a Google Meet join URL
    return new Promise(() => {});
  }
  async sendConfirmationEmail() {}
}

class MicrosoftTeamsPlatform implements MeetingPlatform {
  createMeeting(data: Data): Promise<string> {
    // Logic to generate a Microsoft Teams join URL
    return new Promise(() => {});
  }

  async sendConfirmationEmail() {}
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
