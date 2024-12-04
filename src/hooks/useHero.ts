import { hero_QUERY as query } from "@/sanity/lib/queries";
import type { Hero, Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { useLanguageStore } from "@/stores/language-store";
import { useQuery } from "@tanstack/react-query";

export const fetchHero = async (language: Language) =>
  await client.fetch(query, { language });

const useHero = () => {
  const language = useLanguageStore((state) => state.language);

  return useQuery<Hero>({
    queryKey: ["hero", language],
    queryFn: () => fetchHero(language),
    staleTime: 1000 * 60 * 15, // // Cache for 15 minutes
  });
};

export default useHero;
