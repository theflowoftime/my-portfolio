import { ErrorMessages, FormNames } from "@/types/types";
import { z } from "zod";

export function contactSchema(errorMessages: ErrorMessages = null) {
  return z.object({
    name: z
      .string()
      .min(2, {
        message:
          errorMessages?.name?.min || "Name must be at least 2 characters long",
      })
      .max(30, {
        message:
          errorMessages?.name?.max ||
          "Name must be no more than 30 characters long",
      }),

    email: z.string().email({
      message:
        errorMessages?.email?.invalid || "Please enter a valid email address",
    }),

    phoneNumber: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
      message:
        errorMessages?.phoneNumber?.invalid ||
        "Please enter a valid phone number (e.g., +1234567890 or 1234567890)",
    }),

    reason: z.string().min(1, {
      message: errorMessages?.reason?.min || "Please select a reason",
    }),
  });
}

export function meetSchema() {
  return z.object({});
}

export function buildFormSchema(
  errorMessages: ErrorMessages = null,
  formName: FormNames
) {
  if (formName === "contact") return contactSchema(errorMessages);

  return meetSchema();
}
