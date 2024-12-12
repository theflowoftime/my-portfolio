import axios from "axios";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

export const verifyCaptcha = async (recaptchaToken: string) =>
  (
    await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: recaptchaToken,
        },
      }
    )
  ).data;
