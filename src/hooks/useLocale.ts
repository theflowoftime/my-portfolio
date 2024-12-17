import { LOCALES } from "@/lib/constants";
import { useLanguageStore } from "@/stores/language-store";
import { useEffect, useRef } from "react";

type KEYS = keyof typeof LOCALES;
type Locale = (typeof LOCALES)[KEYS];

export const useLocale = () => {
  const language = useLanguageStore((state) => state.language);
  const localeRef = useRef<Locale>("en-US");

  useEffect(() => {
    localeRef.current = new Intl.Locale(LOCALES[language]).baseName as Locale;
  }, [language]);

  return localeRef.current;
};
