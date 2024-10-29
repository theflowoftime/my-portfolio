import { languages } from "@/stores/language-store";
import { NavLinkProps } from "react-router-dom";

export type Language = (typeof languages)[number];
export interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export type Theme = "dark" | "light" | "system";
export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ScrollStore = {
  hash: string;
  setHash: (hash: string) => void;
  scrollToHash: () => void;
};

export type ActiveNavLinkProps = {
  to: NavLinkProps["to"];
  children: React.ReactNode;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  link: string;
};
