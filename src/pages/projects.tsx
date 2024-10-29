import Header from "@/components/header";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { ActiveNavLinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NavLink, Outlet } from "react-router-dom";

export function ActiveNavLink({ to, children }: ActiveNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          navigationMenuTriggerStyle(),
          isActive ? "text-purple-500" : "text-inherit"
        )
      }
    >
      {children}
    </NavLink>
  );
}

function Projects() {
  return (
    <>
      <Header />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ActiveNavLink to="/projects">all</ActiveNavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ActiveNavLink to="1">1</ActiveNavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ActiveNavLink to="2">2</ActiveNavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ActiveNavLink to="3">3</ActiveNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Outlet />
    </>
  );
}

export default Projects;
