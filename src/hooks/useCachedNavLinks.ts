import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { useLocation } from "react-router-dom";

export function useCachedNavLinks() {
  const language = useLanguageStore((state) => state.language);
  const location = useLocation();
  const navLinks =
    location.state?.navLinks ||
    queryClient.getQueryData(["navLinks", language]);

  return { language, navLinks };
}
