import { NavLinkProps } from "react-router-dom";

export type Language = "EN" | "FR" | "AR";
export interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export type Theme = "dark" | "light" | "system";
export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
