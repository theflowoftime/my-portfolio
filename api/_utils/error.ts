import { FormName } from "@/types/types";
import { VercelResponse } from "@vercel/node";
import { FORM_RESPONSES } from "./constants";
import { ResponseTypes } from "api/types";

export const errorHandler = (
  res: VercelResponse,
  customMessage: string | null,
  messageKey: ResponseTypes,
  name: FormName
) => {
  if (!res) return null;

  const response = FORM_RESPONSES[name]?.[messageKey] || {
    status: 500,
    message: "Unexpected error occurred",
  };

  return res
    .status(response.status)
    .json({ message: customMessage || response.message });
};
