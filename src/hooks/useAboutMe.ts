import { useQuery } from "@tanstack/react-query";
import { AboutMe, Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { aboutMe_Query as query } from "@/sanity/lib/queries";
import { useLanguageStore } from "@/stores/language-store";

const fetchAboutMe = async (language: Language) =>
  await client.fetch(query, { language });

export const useAboutMe = () => {
  const language = useLanguageStore((state) => state.language);

  return useQuery<AboutMe>({
    queryKey: ["aboutMe", language],
    queryFn: () => fetchAboutMe(language),
    staleTime: 1000 * 60 * 15, // // Cache for 15 minutes
  });
};
