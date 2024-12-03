import { useQuery } from "@tanstack/react-query";
import { AboutMe, Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { aboutMe_Query as query } from "@/sanity/lib/queries";
import { useLanguageStore } from "@/stores/language-store";

const fetchAboutMe = async (language: Language) => {
  const params = { language };
  return await client.fetch(query, params);
};

export const useAboutMe = () => {
  const language = useLanguageStore((state) => state.language);

  const { data, error, isLoading } = useQuery<AboutMe>({
    queryKey: ["aboutMe", language],
    queryFn: () => fetchAboutMe(language),
  });

  return { data, error, isLoading };
};
