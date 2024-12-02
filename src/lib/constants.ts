import type { FormSchemaType, Language } from "@/types/types";

export const THROTTLE_DELAY = 5000;
export const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  reason: "", // form.reset isn't resetting it.
};

// Ensure Locales keys are strictly tied to the Language type
export const LOCALES: Record<Language, string> = {
  EN: "en_US",
  FR: "fr_FR",
  AR: "ar",
};
