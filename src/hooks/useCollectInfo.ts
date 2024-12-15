import { API_ENDPOINTS } from "@/lib/constants";
import { isIntendedDomain } from "@/lib/utils";
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

export const useCollectInfo = () => {
  const setVisitorInfo = useVisitorStore((state) => state.setVisitorInfo);
  const language = useLanguageStore((state) => state.language);

  // Fetch visitor data and store it in Zustand
  const { data: visitorInfo, error } = useQuery<VisitorInfoResponse>({
    queryKey: ["visitorInfo", language],
    queryFn: async () => {
      try {
        const response = await axios.get(API_ENDPOINTS["info"], {
          params: {
            lang: language,
          },
        });
        return response.data;
      } catch (err) {
        console.error("Error fetching visitor info:", err);
        throw err;
      }
    },
    // staleTime: Infinity, // Cache data indefinitely to avoid re-fetching
    // gcTime: Infinity, // Keep data in the cache forever
    enabled: isIntendedDomain && !!language, // Ensure correct domain and valid language
    staleTime: 1000 * 60 * 60, // Cache data for an hour
    gcTime: 1000 * 60 * 60, // Keep data in cache for an hour
    retry: 1, // Retry once if the request fails
  });

  // Update Zustand state when visitorInfo changes
  useEffect(() => {
    if (visitorInfo?.status === "success") setVisitorInfo(visitorInfo.info);
  }, [visitorInfo, setVisitorInfo]);

  // Optionally handle errors (e.g., log or show UI feedback)
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch visitor information:", error);
    }
  }, [error]);
};
