import client from "@/sanity/lib/client";
import { resume_QUERY as query } from "@/sanity/lib/queries";
import { Language } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const fetchResume = async (language: Language) =>
  await client.fetch(query, { language });

export function useResume(language: Language) {
  return useQuery({
    queryKey: ["resume", language],
    queryFn: () => fetchResume(language),
  });
}
