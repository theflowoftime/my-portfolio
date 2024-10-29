import { navBar_QUERY as query } from "@/lib/queries";
import type { Language } from "@/types/types";
import client from "@/sanity/client";
import { useLanguageStore } from "@/stores/language-store";
import { useQuery } from "@tanstack/react-query";

export const fetchNavLinks = async (language: Language) => {
  const params = { language };
  const data = await client.fetch(query, params);
  return data;
};

const useNavLinks = () => {
  const language = useLanguageStore((state) => state.language);
  return useQuery({
    queryKey: ["navLinks", language],
    queryFn: () => fetchNavLinks(language),
  });
};

export default useNavLinks;
