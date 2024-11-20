import type { FormSchemaType } from "@/types/types";

export const THROTTLE_DELAY = 5000;
export const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  reason: "", // form.reset isn't resetting it.
};
