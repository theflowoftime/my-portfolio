import { languages } from "@/stores/language-store";
import { NavLinkProps } from "react-router-dom";

export type Language = (typeof languages)[number];
export interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export type Theme = (typeof themes)[number];
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

export type Link = { slug: string; title: string; path: string };

export type Project = {
  _id: string;
  title: string;
  description: string;
  link: string;
};

type Quote = {
  author: string;
  quote: string;
  _key: string;
};

type ProfileImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

type Hero = {
  intro: string;
  separator: string;
  jobs: string[];
  bio: string;
  currentProject?: string;
  quotes: Quote[];
  profileImage?: ProfileImage;
  imageSubtitle?: string;
  buttonContent: string;
};

type NameField = "name" | "email" | "reason" | "phoneNumber";

type Input = {
  label: string;
  placeholder: string;
  name: NameField;
};

type Select = Input & {
  options: string[];
};

type Field = {
  inputs: Input[];
  selects: Select[];
};

export type ErrorMessages = {
  name: { min: string; max: string };
  email: { invalid: string };
  phoneNumber: { invalid: string };
  reason: { min: string };
} | null;

export type Field = "recaptcha" | "rate-limit" | "message";
// Utility type to enforce exactly one key from Field
export type ExactlyOneField<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

// Toast type mapping Status to the appropriate structure
export type Toast = {
  error: ExactlyOneField<Record<Field, string>>;
  success: { message: string };
};

type Contact = {
  _id: string;
  description: { title: string; subtitle: string };
  fields: Field;
  button: { value: string };
  errorMessages?: ErrorMessages;
  toast: Toast;
};
