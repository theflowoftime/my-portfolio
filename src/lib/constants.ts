import type { FormSchemaType, Language } from "@/types/types";

export const THROTTLE_DELAY = 5000;
export const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  reason: "", // form.reset isn't resetting it.
};

// Ensure Locales keys are strictly tied to the Language type
export const LOCALES = {
  EN: "en-US",
  FR: "fr-FR",
  AR: "ar",
} as const;

// This is for consistency in image size
export const PX_REM_ratio = 16;
export const HERO_AVATAR_SIZES = [120, 80];

export const API_ENDPOINTS = {
  "contact-me":
    import.meta.env.MODE === "production"
      ? "/api/contact-me"
      : "https://yacinekedidi.vercel.app/api/contact-me",
  info:
    import.meta.env.MODE === "production"
      ? "/api/info"
      : "https://yacinekedidi.vercel.app/api/info",
};

export const defaultSuccessMessage = "Message submitted successfully!";
export const defaultErrorMessage = "An unknown error occurred.";
