import { cloneElement, ComponentProps, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import Logo from "./icons/Logo";
import Github from "./icons/Github";
import Dribble from "./icons/Dribble";
import Figma from "./icons/Figma";
import type { Link as LinkType } from "@/types/types";
import { MenuIcon, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

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
      <LanguageToggle className={cn(!isDesktop && "text-2xl")} />
      <ThemeToggle className={cn(!isDesktop && "text-2xl")} />
    </div>
  );
};

const LogoWithName = (props: ComponentProps<"div">) => {
  return (
    <div className="flex gap-x-2 items-center" {...props}>
      <Logo className="w-4 h-[17px] dark:fill-white fill-black" />
      <span className="font-bold text-[1rem] dark:text-white self-center">
        Yacine
      </span>
    </div>
  );
};

type Size = "md" | "lg";
type SocialIconsProps = { size?: Size };

const SocialIcons = ({ size }: SocialIconsProps) => {
  const icons = [
    { component: <Github />, mdClass: "w-[42px] h-[40px]" },
    { component: <Dribble />, mdClass: "w-[46px] h-[46px]" },
    { component: <Figma />, mdClass: "w-[28px] h-[40px]" },
  ];

  return (
    <>
      {icons.map((icon, index) =>
        cloneElement(icon.component, {
          className: size === "md" ? icon.mdClass : undefined,
          key: index,
        })
      )}
    </>
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

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div
      id="navbar"
      className="container z-10 flex justify-between sticky top-0 dark:bg-primary bg-background h-[4.56rem]"
    >
      {/* Desktop Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 3.5 }}
        className="fixed lg:block hidden left-[2.5%] -ml-0.5 h-[30%] top-0 border-r-2 border-l-2 border-r-gray-500 border-l-gray-500"
      >
        <div className="relative top-full mt-2 flex flex-col items-center space-y-2">
          <SocialIcons size="lg" />
        </div>
      </motion.div>

      <LogoWithName />

      {/* Hamburger / Close Button */}
      <Button
        className="lg:hidden p-2 dark:text-white text-black self-center bg-transparent hover:bg-transparent hover:text-primary-foreground dark:hover:text-popover-foreground/80"
        onClick={toggleMenu}
      >
        {!isMobileMenuOpen ? <MenuIcon /> : null}
      </Button>

      {/* Desktop Navigation */}
      <div className="lg:flex justify-end hidden">
        <NavigationMenu className="p-4 space-x-8">
          <NavigationMenuList className="flex space-x-8 xl:space-x-16">
            {navLinks?.links?.map((link: LinkType) => (
              <NavigationMenuItem key={link.slug}>
                <NavigationMenuLink asChild>
                  <Link
                    state={{ data: navLinks }}
                    className="dark:hover:text-popover-foreground/80"
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
            className="fixed inset-0 z-20 flex flex-col dark:bg-primary bg-background text-black dark:text-white p-4 lg:hidden"
          >
            <div className="flex justify-between pb-8">
              <LogoWithName />
              {/* Close Button Inside Mobile Menu */}
              <Button
                onClick={toggleMenu}
                className="self-end dark:text-white text-black bg-transparent hover:bg-transparent hover:text-primary-foreground dark:hover:text-popover-foreground/80 p-0 inline-flex items-center"
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
              <div className="flex justify-center items-center p-0 mb-9 gap-x-8">
                <SocialIcons size="md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
