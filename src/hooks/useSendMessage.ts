import axios from "axios";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import type { FormName } from "@/types/types";
import { FieldValues } from "react-hook-form";
import useThrottle from "./useThrottle";
import { API_ENDPOINTS, THROTTLE_DELAY } from "@/lib/constants";

type Payload<F> = F & { recaptchaToken: string };

const SendMessage = async <F>(data: Payload<F>, formName: FormName) => {
  const response = await axios.post(API_ENDPOINTS["contact-me"], data, {
    params: { formName },
  });
  return response.data;
};

const useSendMessage = <FormSchema extends FieldValues>(
  onSuccess: () => void, // External success handler
  onError: (errorKey: "recaptcha" | "rateLimit" | "message") => void, // External error handler
  formName: FormName
) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: (data: Payload<FormSchema>) =>
      SendMessage<FormSchema>(data, formName),
    onSuccess,
    onError: (data: any) => onError(data.response.data.message),
  });

  const handleRecaptcha = async () => {
    if (!recaptchaRef.current) return null;

    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    return token;
  };

  const throttledSubmit = useThrottle(async (data: FormSchema) => {
    const recaptchaToken = await handleRecaptcha();

    if (recaptchaToken) {
      mutate({ ...data, recaptchaToken });
    } else {
      onError("recaptcha");
    }
  }, THROTTLE_DELAY);

  return { throttledSubmit, status, recaptchaRef };
};

export default useSendMessage;
