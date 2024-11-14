import { projects_QUERY as query } from "@/sanity/lib/queries";
import type { Language } from "@/types/types";
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
  } = useQuery({
    queryKey: ["projects", language],
    queryFn: () => fetchprojects(language),
  });

  return { projects, error, isLoading };
};
