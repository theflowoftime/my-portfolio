import axios from "axios";
import { useToast } from "./use-toast";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import type { FormSchemaType, Contact } from "@/types/types";
import { UseFormReturn } from "react-hook-form";
import useThrottle from "./useThrottle";
import { API_ENDPOINTS, THROTTLE_DELAY } from "@/lib/constants";

const SendMessage = async (
  data: FormSchemaType & { recaptchaToken: string }
) => {
  const response = await axios.post(API_ENDPOINTS["contact-me"], data);
  return response.data;
};

const useSendMessage = (
  contactData: Contact | undefined,
  form: UseFormReturn<FormSchemaType>
) => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: SendMessage,
    onSuccess: () => {
      form.reset();

      toast({
        description: contactData?.toast.success.message,
      });
    },
    onError: (data: any) => {
      const msg = data.response.data.message;

      console.log(msg);

      toast({
        description:
          contactData?.toast.error?.[
            msg as keyof typeof contactData.toast.error
          ],
      });
    },
  });

  const handleRecaptcha = async () => {
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    return token;
  };

  const throttledSubmit = useThrottle(async (data: FormSchemaType) => {
    const recaptchaToken = await handleRecaptcha();

    if (recaptchaToken) {
      mutate({ ...data, recaptchaToken });
    } else {
      toast({
        description:
          contactData?.toast.error?.[
            "recaptcha" as keyof typeof contactData.toast.error
          ] || "reCAPTCHA verification failed. Please try again.",
      });
    }
  }, THROTTLE_DELAY);

  return { throttledSubmit, status, recaptchaRef };
};

export default useSendMessage;
