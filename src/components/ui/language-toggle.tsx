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

export function LanguageToggle({ className }: { className?: string }) {
  const { setLanguage, language } = useLanguageStore(); // Get language and setLanguage from Zustand store

  const changeLanguage = (lng: Language) => {
    setLanguage(lng); // Update the Zustand store with the selected language
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <span>{language}</span>
          {/* Assuming you have a 'language' key for the toggle */}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-none">
        {languages.map(
          (lng) =>
            language !== lng && (
              <DropdownMenuItem
                className={className}
                key={lng}
                onClick={() => changeLanguage(lng)}
              >
                {lng}
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
