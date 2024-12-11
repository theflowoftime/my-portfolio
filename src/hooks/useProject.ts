import { project_QUERY as query } from "@/sanity/lib/queries";
import type { Language, Project } from "@/types/types";
import client from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

export const fetchproject = async (language: Language, _id: string) => {
  const params = { language, _id };
  return await client.fetch(query, params);
};

export const useProject = (language: Language, id: string) => {
  const { data, error, isLoading } = useQuery<Project>({
    queryKey: ["project", language],
    queryFn: () => fetchproject(language, id),
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });

  return { data, error, isLoading };
};
