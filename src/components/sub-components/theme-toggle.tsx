import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useThemeStore, { themes } from "@/stores/theme-store";
import useNavLinks from "@/hooks/useNavLinks";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeStore();
  const { data: navbarData, isLoading } = useNavLinks();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  if (isLoading) {
    return <DropdownMenu />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="ghost" size="icon">
          <Sun className="absolute !h-[1rem] !w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute !h-[1rem] !w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none animate-accordion-down min-w-min"
      >
        {themes.map(
          (thm, index) =>
            theme !== thm && (
              <DropdownMenuItem key={thm} onClick={() => setTheme(thm)}>
                {navbarData?.themes?.[index]}
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
