import { useQuery } from "@tanstack/react-query";
import { AboutMe, Language } from "@/types/types";
import client from "@/sanity/lib/client";
import { aboutMe_Query as query } from "@/sanity/lib/queries";

const fetchAboutMe = async (language: Language) => {
  const params = { language };
  return await client.fetch(query, params);
};

export const useAboutMe = (language: Language) => {
  const { data, error, isLoading } = useQuery<AboutMe>({
    queryKey: ["about-me", language],
    queryFn: () => fetchAboutMe(language),
  });

  return { data, error, isLoading };
};
