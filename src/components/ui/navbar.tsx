import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useNavLinks from "@/hooks/useNavLinks";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { Link } from "react-router-dom";
import darkLogoUrl from "@/assets/Logo-dark.svg";
import lightLogoUrl from "@/assets/Logo-light.svg";

import useThemeStore from "@/stores/theme-store";

const NavBar = () => {
  const theme = useThemeStore((state) => state.theme);
  const { data: navLinks, isLoading } = useNavLinks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      id="navbar"
      className="flex justify-between sticky top-0 dark:bg-primary bg-white"
    >
      <div className="flex gap-x-2">
        <img src={theme === "light" ? lightLogoUrl : darkLogoUrl} alt="logo" />
        <span className="font-bold text-[1rem] dark:text-white self-center">
          Yacine
        </span>
      </div>
      <div className="flex justify-end ">
        <NavigationMenu className="p-4 space-x-8">
          <NavigationMenuList className="flex space-x-16">
            {navLinks?.links?.map(
              (link: { slug: string; title: string; path: string }) => (
                <NavigationMenuItem key={link.slug}>
                  <NavigationMenuLink asChild>
                    <Link
                      state={{ data: navLinks }}
                      className="hover:text-blue-500"
                      to={link.path || `#${link.slug}`}
                    >
                      <span className="text-primary-foreground">#</span>
                      {link.title.replace("-", " ")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <LanguageToggle />
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <ThemeToggle />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
