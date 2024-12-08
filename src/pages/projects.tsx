import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { ActiveNavLinkProps } from "@/types/types";
import { cn } from "@/lib/utils";
import { NavLink, Outlet } from "react-router-dom";
import PageLayout from "@/layouts/page-layout";

export function ActiveNavLink({ to, children }: ActiveNavLinkProps) {
  return (
    <NavLink
      defaultValue={"/projects"}
      to={to}
      end
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
  // pass in the slug instead of the title | transaltions
  return (
    <PageLayout title="projects">
      <ActiveNavLink to="/projects">all</ActiveNavLink>
      <ActiveNavLink to="1">1</ActiveNavLink>
      <ActiveNavLink to="2">2</ActiveNavLink>
      <ActiveNavLink to="3">3</ActiveNavLink>
      <Outlet />
    </PageLayout>
  );
}

export default Projects;
