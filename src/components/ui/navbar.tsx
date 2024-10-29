import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useNavLinks from "@/hooks/useNavLinks";
import { Link } from "react-router-dom";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
  const { data: navLinks, isLoading } = useNavLinks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-end">
      <NavigationMenu className="p-4 border-b">
        <NavigationMenuList className="flex space-x-16">
          {navLinks?.links?.map(
            (link: { slug: string; title: string; path: string }) => (
              <NavigationMenuItem key={link.slug}>
                <NavigationMenuLink asChild>
                  <Link
                    state={{ data: navLinks }}
                    className="hover:text-blue-500"
                    to={link.path || `/#${link.slug}`}
                  >
                    {link.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}

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
  );
};

export default NavBar;
