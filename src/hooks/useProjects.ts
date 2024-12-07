import { projects_QUERY as query } from "@/sanity/lib/queries";
import type { Language, Projects } from "@/types/types";
import client from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

export const fetchprojects = async (language: Language) => {
  const params = { language };
  return await client.fetch(query, params);
};

export const useProjects = (language: Language) => {
  const {
    data: projects,
    error,
    isLoading,
  } = useQuery<Projects>({
    queryKey: ["projects", language],
    queryFn: () => fetchprojects(language),
    staleTime: 1000 * 60 * 15, // // Cache for 15 minutes
  });

  return { projects, error, isLoading };
};
