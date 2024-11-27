import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useNavLinks from "@/hooks/useNavLinks";
import useScrollY from "@/hooks/useScrollY";
import { cn } from "@/lib/utils";
import type { Link as LinkType } from "@/types/types";
import { motion } from "framer-motion";
import { MenuIcon, MessageCircle } from "lucide-react";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import Toggles from "./hero/preferences-toggle";
import LogoWithName from "./site-logo";
import { Button } from "../ui/button";

const NavBar = ({ className }: ComponentProps<"div">) => {
  const { data: navLinks, isLoading } = useNavLinks();
  const isScrolled = useScrollY();

  if (isLoading)
    return (
      <div
        id="navbar"
        className={cn("z-10 bg-inherit h-[4.56rem]", className)}
      />
    );

  return (
    <div id="navbar" className={cn("z-10 bg-inherit h-[4.56rem]", className)}>
      <motion.div
        initial={{ y: 0 }}
        animate={
          isScrolled
            ? {
                y: 10,
                borderRadius: "calc(var(--radius) - 2px)",
                shadow:
                  "rgba(0, 0, 0, 0.008) 0px 0.71133px 0.71133px -0.25px, rgba(0, 0, 0, 0.009) 0px 1.93715px 1.93715px -0.5px, rgba(0, 0, 0, 0.01) 0px 4.25329px 4.25329px -0.75px, rgba(0, 0, 0, 0.01) 0px 9.44132px 9.44132px -1px, rgba(0, 0, 0, 0.023) 0px 24px 24px -1.25px",
              }
            : "initial"
        }
        className={cn(
          "container fixed top-0 left-0 right-0 z-20 flex items-center justify-between w-full py-2 flex-nowrap max-h-fit",
          isScrolled &&
            "bg-black backdrop-blur-2xl backdrop-filter bg-opacity-5 transition-colors duration-1000 ease-in"
        )}
      >
        {/* Logo with motion */}
        <motion.div
          className=""
          animate={{
            x: isScrolled ? 20 : 0, // Move left when scrolled
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <LogoWithName />
        </motion.div>

        {/* Navigation Menu and Toggles */}
        <motion.div
          className="flex flex-row items-center gap-x-2 md:gap-x-4"
          animate={{
            x: isScrolled ? 20 : 0, // Move right when scrolled
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <NavigationMenu orientation="vertical" className="bg-transparent">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="p-2 text-white bg-inherit focus:bg-transparent">
                  <MenuIcon className="stroke-white" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-4 text-base gap-y-4 ">
                  {navLinks?.links?.map((link: LinkType) => (
                    <NavigationMenuLink key={link.slug} asChild>
                      <Link
                        state={{ data: navLinks }}
                        className="text-base whitespace-nowrap dark:text-white hover:text-popover-foreground/40"
                        to={link.path || `#${link.slug}`}
                      >
                        <span className="text-primary-foreground">#</span>
                        {link.title.replace("-", " ")}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <Separator className="bg-white/20" orientation="vertical" />
          </NavigationMenu>

          <Toggles />

          {/* Button with glowy effect */}
          {isScrolled ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <Link
                to={
                  navLinks?.links?.[3].path || `#${navLinks?.links?.[3].slug}`
                }
                state={{ data: navLinks }}
                className="relative"
              >
                <Button className="relative text-white transition-transform duration-300 rounded-full shadow-lg md:px-6 md:py-3 font-unbounded bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 hover:scale-105">
                  <span className="absolute inset-0 rounded-full blur-lg opacity-60 bg-gradient-to-r from-purple-400 to-pink-500"></span>
                  <span className="hidden md:inline">contact me</span>
                  <MessageCircle className="inline-block md:hidden" />
                </Button>
              </Link>
            </motion.div>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NavBar;
