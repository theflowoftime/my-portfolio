import axios from "axios";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import type { FormNames } from "@/types/types";
import { FieldValues } from "react-hook-form";
import useThrottle from "./useThrottle";
import { API_ENDPOINTS, THROTTLE_DELAY } from "@/lib/constants";

const SendMessage = async <F>(
  data: F & { recaptchaToken: string },
  formName: FormNames
) => {
  const response = await axios.post(API_ENDPOINTS["contact-me"], data, {
    params: { formName },
  });
  return response.data;
};

const useSendMessage = <FormSchema extends FieldValues>(
  onSuccess: () => void, // External success handler
  onError: (errorKey: "recaptcha" | "unauthorized" | "rateLimit") => void, // External error handler
  formName: FormNames
) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: (data: FormSchema & { recaptchaToken: string }) =>
      SendMessage<FormSchema>(data, formName),
    onSuccess,
    onError: (data: any) => onError(data.response.data.message),
  });

  const handleRecaptcha = async () => {
    if (!recaptchaRef.current) return null; // Skip reCAPTCHA if not required
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    return token;
  };

  const throttledSubmit = useThrottle(async (data: FormSchema) => {
    const recaptchaToken = await handleRecaptcha();

    if (recaptchaToken) {
      mutate({ ...data, recaptchaToken, formName });
    } else {
      onError("recaptcha");
    }
  }, THROTTLE_DELAY);

  return { throttledSubmit, status, recaptchaRef };
};

export default useSendMessage;
