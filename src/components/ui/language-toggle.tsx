// LanguageToggle.js
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Language } from "@/types/types";
import { languages, useLanguageStore } from "@/stores/language-store";

export function LanguageToggle() {
  const { setLanguage, language } = useLanguageStore(); // Get language and setLanguage from Zustand store

  const changeLanguage = (lng: Language) => {
    setLanguage(lng); // Update the Zustand store with the selected language
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span>{language}</span>
          {/* Assuming you have a 'language' key for the toggle */}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(
          (lng) =>
            language !== lng && (
              <DropdownMenuItem key={lng} onClick={() => changeLanguage(lng)}>
                {lng}
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
