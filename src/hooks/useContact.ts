import { contact_QUERY as query } from "@/sanity/lib/queries";
import type { Contact, Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { useLanguageStore } from "@/stores/language-store";
import { useQuery } from "@tanstack/react-query";

export const fetchContact = async (language: Language) => {
  const params = { language };
  const data = await client.fetch(query, params);
  return data;
};

const useContact = () => {
  const language = useLanguageStore((state) => state.language);

  return useQuery<Contact>({
    queryKey: ["contact", language],
    queryFn: () => fetchContact(language),
    staleTime: 1000 * 60 * 5, // // Cache for 5 minutes
  });
};

export default useContact;
