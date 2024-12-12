export const FORM_RESPONSES = {
  contact: {
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
    error: { message: "message", status: 500 },
  },
};
