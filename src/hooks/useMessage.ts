import type { Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { useLanguageStore } from "@/stores/language-store";
import { useMutation } from "@tanstack/react-query";
import type { FormSchemaType } from "@/components/contact";

type Message = FormSchemaType & {
  language: Language;
  _type: string;
};

export const createMessage = async (
  messageData: FormSchemaType,
  language: Language
) => {
  const data = await client.create<Message>({
    _type: "message",
    ...messageData,
    language,
  });
  return data;
};

const useMessage = () => {
  const language = useLanguageStore((state) => state.language);

  return useMutation({
    mutationKey: ["message", language],
    mutationFn: (messageData: FormSchemaType) =>
      createMessage(messageData, language),
  });
};

export default useMessage;
