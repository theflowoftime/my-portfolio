import type { LanguageStore } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const languages = ["EN", "FR", "AR"] as const;

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "EN",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
