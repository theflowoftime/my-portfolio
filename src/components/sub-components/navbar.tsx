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

const NavBar = ({ className }: ComponentProps<"div">) => {
  const { data: navbarData, isLoading } = useNavLinks();
  const scrollYProgress = useScrollY();

  if (isLoading || !navbarData)
    return (
      <div
        id="navbar"
        className={cn("z-10 bg-inherit h-[4.56rem]", className)}
      />
    );

  const {
    links,
    button: { text, visibilityIntervalScrollY: interval },
  } = navbarData;

  return (
    <AnimatePresence>
      <div id="navbar" className={cn("z-10 bg-inherit h-[4.56rem]", className)}>
        <motion.div
          animate={
            scrollYProgress > interval[0] ? { justifyContent: "end" } : ""
          }
          className={
            "container fixed top-0 left-0 right-0 z-20 flex items-center justify-between w-full py-2 flex-nowrap h-fit"
          }
        >
          {/* Logo with motion */}
          {scrollYProgress <= interval[0] ? (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <LogoWithName />
            </motion.div>
          ) : null}
          {/* Navigation Menu and Toggles */}
          <motion.div
            className={cn(
              "flex flex-row gap-x-2 md:gap-x-4",
              scrollYProgress > interval[0] &&
                "bg-black backdrop-blur-2xl backdrop-filter bg-opacity-5 transition-colors duration-1000 ease-in py-2 px-4 h-fit"
            )}
            style={{
              borderRadius: "calc(var(--radius) - 2px)",
              shadow:
                "rgba(0, 0, 0, 0.008) 0px 0.71133px 0.71133px -0.25px, rgba(0, 0, 0, 0.009) 0px 1.93715px 1.93715px -0.5px, rgba(0, 0, 0, 0.01) 0px 4.25329px 4.25329px -0.75px, rgba(0, 0, 0, 0.01) 0px 9.44132px 9.44132px -1px, rgba(0, 0, 0, 0.023) 0px 24px 24px -1.25px",
            }}
          >
            <NavigationMenu orientation="vertical">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-2 dark:text-white bg-inherit focus:bg-transparent">
                    <MenuIcon className="dark:stroke-white stroke-black" />
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="flex flex-col p-4 text-base gap-y-4">
                    {links?.map((link: LinkType) => (
                      <NavigationMenuLink key={link.title} asChild>
                        <Link
                          state={{ data: links }}
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
            {scrollYProgress > interval[0] && scrollYProgress < interval[1] ? (
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 5,
                  },
                }}
              >
                <Link
                  to={links[3].path || `#${links[3].slug}`}
                  state={{ data: links }}
                  className="relative"
                >
                  <Button className="relative transition-transform duration-300 rounded-full shadow-lg dark:text-white md:px-6 md:py-3 font-unbounded hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-400 hover:scale-105">
                    <span className="absolute inset-0 rounded-full blur-md mix-blend-lighten bg-gradient-to-r from-purple-400 to-pink-500" />
                    <span className="hidden text-white md:inline">{text}</span>
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
