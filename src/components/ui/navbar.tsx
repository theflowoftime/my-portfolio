import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useNavLinks from "@/hooks/useNavLinks";
import { cn } from "@/lib/utils";
import type { Link as LinkType } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, X } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialIcons } from "../hero";
import { Button } from "./button";
import Logo from "./icons/Logo";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

const Toggles = ({
  isDesktop,
  ...props
}: {
  isDesktop?: boolean;
} & ComponentProps<"div">) => {
  return (
    <div
      className={cn(isDesktop && "gap-x-2", !isDesktop && "gap-x-8", "flex")}
      {...props}
    >
      <LanguageToggle
        className={cn(
          !isDesktop && "text-2xl",
          "shadow-sm shadow-black text-white text-xs"
        )}
      />
      <ThemeToggle
        className={cn(
          !isDesktop && "text-2xl",
          "shadow-sm shadow-black text-white text-xs"
        )}
      />
    </div>
  );
};

export const LogoWithName = (props: ComponentProps<"div">) => {
  return (
    <div className="flex items-center select-none gap-x-2" {...props}>
      <Logo className="w-4 h-[17px] dark:fill-white fill-black" />
      <span className="self-center text-base font-bold dark:text-white">
        Yacine
      </span>
    </div>
  );
};

const NavBar = () => {
  const { data: navLinks, isLoading } = useNavLinks();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  if (isLoading) return null;

  return (
    <div id="navbar" className="z-10 bg-inherit sticky top-0 h-[4.56rem]">
      <div className="container flex justify-between">
        <LogoWithName />

        {/* Hamburger  */}
        <Button
          className="self-center p-2 text-white bg-transparent lg:hidden hover:bg-transparent hover:text-primary-foreground dark:hover:text-popover-foreground/80"
          onClick={toggleMenu}
        >
          {!isMobileMenuOpen ? <MenuIcon /> : null}
        </Button>

        {/* Desktop Navigation */}
        <div className="justify-end hidden lg:flex">
          <NavigationMenu className="py-2 space-x-8 ">
            <NavigationMenuList className="flex space-x-8 xl:space-x-8">
              {navLinks?.links?.map((link: LinkType) => (
                <NavigationMenuItem key={link.slug}>
                  <NavigationMenuLink asChild>
                    <Link
                      state={{ data: navLinks }}
                      className="text-[0.85rem] text-white hover:text-popover-foreground/40"
                      to={link.path || `#${link.slug}`}
                    >
                      <span className="text-primary-foreground">#</span>
                      {link.title.replace("-", " ")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <Toggles isDesktop />
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed inset-0 z-20 flex flex-col p-4 text-black bg-white dark:text-white lg:hidden bg-clip-padding backdrop-blur-xl backdrop-filter bg-opacity-10 "
            >
              <div className="flex justify-between pb-8">
                <LogoWithName />
                {/* Close Button Inside Mobile Menu */}
                <Button
                  onClick={toggleMenu}
                  className="inline-flex items-center self-end p-0 text-black bg-transparent dark:text-white hover:bg-transparent hover:text-primary-foreground dark:hover:text-popover-foreground/80"
                  size="icon" // Adjust to minimize Button's default height/width
                >
                  <X className="!w-8 !h-8" />
                </Button>
              </div>

              <div className="mt-[47px] flex flex-col justify-between h-full">
                <nav className="flex flex-col space-y-16 text-3xl">
                  {navLinks?.links?.map((link: LinkType) => (
                    <Link
                      key={link.slug}
                      to={link.path || `#${link.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="dark:hover:text-popover-foreground/80"
                    >
                      <span className="text-primary-foreground">#</span>
                      {link.title.replace("-", " ")}
                    </Link>
                  ))}
                  <Toggles isDesktop={false} />
                </nav>
                <SocialIcons
                  className="flex flex-row items-center justify-center py-2 mb-2 flex-nowrap gap-x-4"
                  size="md"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBar;
