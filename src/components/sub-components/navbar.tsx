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
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, MessageCircle } from "lucide-react";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import Toggles from "./hero/preferences-toggle";
import LogoWithName from "./site-logo";
import { Button } from "../ui/button";

const buttonText = "Let's Talk!";

const yScrollYProgressionRange = [0.01, 0.88];

const NavBar = ({ className }: ComponentProps<"div">) => {
  const { data: navLinks, isLoading } = useNavLinks();
  const scrollYProgress = useScrollY();

  if (isLoading)
    return (
      <div
        id="navbar"
        className={cn("z-10 bg-inherit h-[4.56rem]", className)}
      />
    );

  return (
    <AnimatePresence mode="popLayout">
      <div id="navbar" className={cn("z-10 bg-inherit h-[4.56rem]", className)}>
        <motion.div
          initial={{ y: 0 }}
          animate={
            scrollYProgress > yScrollYProgressionRange[0]
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
            scrollYProgress > yScrollYProgressionRange[0] &&
              "bg-black backdrop-blur-2xl backdrop-filter bg-opacity-5 transition-colors duration-1000 ease-in"
          )}
        >
          {/* Logo with motion */}
          <motion.div
            animate={{
              x:
                scrollYProgress > yScrollYProgressionRange[0] &&
                scrollYProgress < yScrollYProgressionRange[1]
                  ? 20
                  : 0, // Move left when scrolled
            }}
            // transition={{ type: "spring", stiffness: 100 }}
            layout
          >
            <LogoWithName />
          </motion.div>
          {/* Navigation Menu and Toggles */}

          <motion.div
            className="flex flex-row items-center gap-x-2 md:gap-x-4"
            animate={{
              x:
                scrollYProgress > yScrollYProgressionRange[0] &&
                scrollYProgress < yScrollYProgressionRange[1]
                  ? 20
                  : 0, // Move right when scrolled
            }}
            // transition={{ type: "spring", stiffness: 100 }}
            // layout
          >
            <NavigationMenu orientation="vertical">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 dark:text-white bg-inherit focus:bg-transparent">
                    <MenuIcon className="dark:stroke-white stroke-black" />
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="flex flex-col p-4 text-base gap-y-4">
                    {navLinks?.links?.map((link: LinkType) => (
                      <NavigationMenuLink key={link.title} asChild>
                        <Link
                          state={{ data: navLinks }}
                          className="text-base whitespace-nowrap dark:text-white hover:opacity-40 font-unbounded"
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
            {scrollYProgress > yScrollYProgressionRange[0] &&
            scrollYProgress < yScrollYProgressionRange[1] ? (
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 5 }}
              >
                <Link
                  to={
                    navLinks?.links?.[3].path || `#${navLinks?.links?.[3].slug}`
                  }
                  state={{ data: navLinks }}
                  className="relative"
                >
                  <Button className="relative transition-transform duration-300 rounded-full shadow-lg dark:text-white md:px-6 md:py-3 font-unbounded hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-400 hover:scale-105">
                    <span className="absolute inset-0 rounded-full blur-lg mix-blend-lighten bg-gradient-to-r from-purple-400 to-pink-500" />
                    <span className="hidden text-white md:inline">
                      {buttonText}
                    </span>
                    <MessageCircle className="inline-block md:hidden" />
                  </Button>
                </Link>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NavBar;
