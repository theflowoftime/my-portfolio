import useVisitorStore from "@/stores/visitor-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const useCollectInfo = () => {
  const setVisitorInfo = useVisitorStore((state) => state.setVisitorInfo);

  const isIntendedDomain =
    typeof window !== "undefined" &&
    window.location.hostname === "yacinekedidi.vercel.app";

  console.log(import.meta.env.VITE_WEBSITE_URL);

  // Fetch visitor data and store it in Zustand
  const { data: visitorInfo } = useQuery({
    queryKey: ["visitorInfo"],
    queryFn: async () => {
      const ipResponse = await axios.get("/api/info");
      return ipResponse.data.info;
    },
    enabled: isIntendedDomain,
    staleTime: Infinity, // Cache data indefinitely to avoid re-fetching
    gcTime: Infinity, // Keep data in the cache forever
  });

  // Update Zustand state when visitorInfo changes
  useEffect(() => {
    if (visitorInfo) {
      setVisitorInfo(visitorInfo);
    }
  }, [visitorInfo, setVisitorInfo]);
};
