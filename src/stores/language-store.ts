import type { LanguageStore } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Available languages
export const languages = ["EN", "FR", "AR"] as const;

// Function to detect and match the browser's language
function getDefaultLanguage(): LanguageStore["language"] {
  const browserLang = navigator.language.slice(0, 2).toUpperCase();

  return languages.includes(browserLang as (typeof languages)[number])
    ? (browserLang as LanguageStore["language"])
    : languages[0]; // Default to English if no match
}

// Language store with default set to browser language
export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getDefaultLanguage(), // Set default based on browser
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
