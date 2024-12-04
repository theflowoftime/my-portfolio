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
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

export function LanguageToggle({ className }: { className?: string }) {
  const { setLanguage, language } = useLanguageStore(); // Get language and setLanguage from Zustand store
  const { navLinks: navbarData } = useCachedNavLinks();

  const changeLanguage = (lng: Language) => {
    setLanguage(lng); // Update the Zustand store with the selected language
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="ghost" size="icon">
          <span>{language}</span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none animate-accordion-down min-w-min"
      >
        {languages.map(
          (lng, index) =>
            language !== lng && (
              <DropdownMenuItem key={lng} onClick={() => changeLanguage(lng)}>
                {navbarData?.languages?.[index]}
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
