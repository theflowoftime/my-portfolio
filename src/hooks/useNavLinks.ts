import { navBar_QUERY as query } from "@/sanity/lib/queries";
import type { Language, Navbar } from "@/types/types";
import client from "@/sanity/lib/client";
import { useLanguageStore } from "@/stores/language-store";
import { useQuery } from "@tanstack/react-query";

export const fetchNavLinks = async (language: Language) =>
  await client.fetch(query, { language });

const useNavLinks = () => {
  const language = useLanguageStore((state) => state.language);
  return useQuery<Navbar>({
    queryKey: ["navLinks", language],
    queryFn: () => fetchNavLinks(language),
    staleTime: 1000 * 60 * 15, // // Cache for 15 minutes
  });
};

export default useNavLinks;
