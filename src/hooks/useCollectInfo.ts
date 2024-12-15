import { useLanguageStore } from "@/stores/language-store";
import useVisitorStore from "@/stores/visitor-store";
import { InfoVisitor } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { MessageError, Status } from "api/types";
import axios from "axios";
import { useEffect } from "react";

type VisitorInfoResponse =
  | {
      status: Extract<Status, "success">;
      info: InfoVisitor;
    }
  | {
      status: Extract<Status, "fail">;
      error: { message: MessageError };
    };

const isIntendedDomain =
  typeof window !== "undefined" &&
  window.location.hostname === import.meta.env.VITE_WEBSITE_URL;

export const useCollectInfo = () => {
  const setVisitorInfo = useVisitorStore((state) => state.setVisitorInfo);
  const language = useLanguageStore((state) => state.language);

  // Fetch visitor data and store it in Zustand
  const { data: visitorInfo, refetch } = useQuery<VisitorInfoResponse>({
    queryKey: ["visitorInfo"],
    queryFn: async () => {
      const response = await axios.get("/api/info", {
        params: {
          lang: language,
        },
      });
      return response.data;
    },
    enabled: isIntendedDomain,
    // staleTime: Infinity, // Cache data indefinitely to avoid re-fetching
    // gcTime: Infinity, // Keep data in the cache forever
    staleTime: 1000 * 60 * 60, // Cache data for an hour to avoid re-fetching
  });

  useEffect(() => {
    refetch();
  }, [language]);

  // Update Zustand state when visitorInfo changes
  useEffect(() => {
    if (visitorInfo) {
      if (visitorInfo.status === "success") setVisitorInfo(visitorInfo.info);
    }
  }, [visitorInfo, setVisitorInfo]);
};
