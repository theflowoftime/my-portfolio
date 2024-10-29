import type { LanguageStore } from "@/lib/types";
import { create } from "zustand";

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "EN",
  setLanguage: (language) => set({ language }),
}));
