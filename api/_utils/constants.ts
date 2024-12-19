import { TFORM_RESPONSES } from "../types";

export const FORM_RESPONSES: TFORM_RESPONSES = {
  contact: {
    _type: "message",
    ip_prefix: "contact-rate-limit:",
    unauthorized: {
      message: "Method not allowed",
      status: 405,
    },
    recaptcha: {
      message: "recaptcha",
      status: 403,
    },
    rateLimit: {
      message: "rateLimit",
      status: 429,
    },
    success: {
      message: "Message submitted successfully!",
      status: 200,
    },
    error: {
      message: "message",
      status: 500,
    },
  },
  meet: {
    _type: "meeting",
    ip_prefix: "meet-rate-limit:",
    unauthorized: {
      message: "Method not allowed",
      status: 405,
    },
    recaptcha: {
      message: "recaptcha",
      status: 403,
    },
    rateLimit: {
      message: "rateLimit",
      status: 429,
    },
    success: {
      message: "Meeting is successfully scheduled!",
      status: 200,
    },
    error: {
      message: "message",
      status: 500,
    },
  },
};

export const FIELDS_NUMERIC = 60551167;
export const DEFAULT_LANG = "EN";
