import type { ThemeStore } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // Name for localStorage key
    }
  )
);

export default useThemeStore;
