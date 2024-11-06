import { hero_QUERY as query } from "@/lib/queries";
import type { Hero, Language } from "@/types/types";
import client from "@/sanity/client";
import { useLanguageStore } from "@/stores/language-store";
import { useQuery } from "@tanstack/react-query";

export const fetchHero = async (language: Language) => {
  const params = { language };
  const data = await client.fetch(query, params);
  return data;
};

const useHero = () => {
  const language = useLanguageStore((state) => state.language);

  return useQuery<Hero>({
    queryKey: ["hero", language],
    queryFn: () => fetchHero(language),
  });
};

export default useHero;
