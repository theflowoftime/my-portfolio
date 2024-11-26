import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useNavLinks from "@/hooks/useNavLinks";
import { cn } from "@/lib/utils";
import type { Link as LinkType } from "@/types/types";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import Logo from "./icons/Logo";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

const Toggles = (props: ComponentProps<"div">) => {
  return (
    <div className="flex gap-x-2" {...props}>
      <LanguageToggle className="text-xs text-white shadow-sm shadow-black" />
      <ThemeToggle className="text-xs text-white shadow-sm shadow-black" />
    </div>
  );
};

export const LogoWithName = (props: ComponentProps<"div">) => {
  return (
    <div className="flex items-center select-none gap-x-2" {...props}>
      <Logo className="w-4 h-4 fill-white" />
      <span className="self-center text-base font-bold text-white">
        Yacine;
      </span>
    </div>
  );
};

// const useScrollY = () => {
//   const { scrollYProgress } = useScroll();
//   // const isScrolled = useMotionValue(0);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const unsub = scrollYProgress.on("change", (latest) => {
//       setIsScrolled(latest > 0);
//     });

//     return () => unsub();
//   }, [scrollYProgress]);

//   return isScrolled;
// };

const NavBar = ({ className }: ComponentProps<"div">) => {
  const { data: navLinks, isLoading } = useNavLinks();
  // const isScrolled = useScrollY();

  if (isLoading) return null;

  return (
    <div id="navbar" className={cn("z-10 = bg-inherit h-[4.56rem]", className)}>
      <motion.div
        className={cn(
          "container fixed top-0 left-0 right-0 z-20 flex items-center justify-between w-full py-2",
          // isScrolled &&
          "bg-black backdrop-blur-2xl backdrop-filter bg-opacity-5"
        )}
      >
        <LogoWithName />
        <div className="flex gap-x-4 sm:flex-col md:flex-row">
          <NavigationMenu orientation="vertical" className="bg-transparent">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="p-2 text-white bg-inherit">
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
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
