import type { LanguageStore } from "@/types/types";
import { create } from "zustand";

export const languages = ["EN", "FR", "AR"] as const;

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "EN",
  setLanguage: (language) => set({ language }),
}));
