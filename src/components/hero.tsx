import useHero from "@/hooks/useHero";
import { ChevronsDown, Loader2 } from "lucide-react";
import { type Hero } from "@/types/types";
import { LeftSide } from "./sub-components/hero/left-side";
import RightSide from "./sub-components/hero/right-side";
import Quotes from "./sub-components/hero/bottom";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { waterFall } from "@/lib/framer-variants";

function Rectangle() {
  return (
    <div
      className="md:block hidden absolute bottom-20 right-0 shadow-sm shadow-black 
     h-[5.69rem] w-[5.69rem] bg-clip-padding bg-opacity-10"
    />
  );
}

function Hero() {
  // const { data: heroData, isLoading } = useHero();
  const { navLinks } = useCachedNavLinks();

  // if (isLoading)
  //   return (
  //     <div className="relative flex flex-col">
  //       <Loader2 />
  //     </div>
  //   );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall} // Define stagger children in the parent
      className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)]"
    >
      <motion.div className="container h-full space-y-4 text-center text-white">
        {/** Title Section */}
        <motion.div className="leading-[6.33rem] font-instrument text-[4rem] lg:text-[5.11rem] -tracking-[0.17rem]">
          <motion.p
            variants={waterFall}
            className="flex items-center justify-center whitespace-nowrap"
          >
            <span className="space-x-4">
              <span className="">I'm</span>
              <span className="italic bg-black rounded-lg bg-opacity-5 mix-blend-screen backdrop-blur-lg bg-clip-padding text-effect">
                Yacine
              </span>
              <Avatar className="hidden sm:inline-block min-w-min min-h-min my-auto  w-[5rem] h-[3.75rem] lg:w-[7.5rem] shadow-md bg-black backdrop-blur-2xl bg-opacity-5">
                <AvatarImage
                  className="object-contain"
                  src="/me.png"
                  alt="me"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
            <span>,</span>
          </motion.p>
          <motion.p
            variants={waterFall}
            custom={0.6}
            className="flex items-center justify-center gap-x-2 whitespace-nowrap"
          >
            <span className="space-x-4">
              <span>Product</span>
              <Avatar className="hidden sm:inline-block min-w-min min-h-min h-[3.75rem] w-[5rem] lg:w-[7.5rem] shadow-md bg-black">
                <AvatarImage
                  className="object-cover"
                  src="/product.jpg"
                  alt="product"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>{" "}
            <span className="italic bg-black rounded-lg mix-blend-screen bg-opacity-5 backdrop-blur-2xl bg-clip-padding text-effect">
              Developer
            </span>
          </motion.p>
          <motion.p
            variants={waterFall}
            custom={0.8}
            className="flex items-center justify-center gap-x-2 whitespace-nowrap"
          >
            <span className="space-x-2">
              <span className="px-1 mx-auto text-white">based in Tunis</span>
              <Avatar className="hidden sm:inline-block min-w-min min-h-min h-[3.75rem] w-[5rem] lg:w-[7.5rem] shadow-md bg-black">
                <AvatarImage
                  className="object-cover"
                  src="/tunis.jpg"
                  alt="tunis"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
          </motion.p>
        </motion.div>
        {/** Description Section */}
        <motion.p
          variants={waterFall}
          custom={1}
          className="tracking-tight text-pretty text-white/40"
        >
          I have 5 years of experience working on useful and mindful <br />
          products together with startups and established brands
        </motion.p>
      </motion.div>
      {/** Call-to-action Section */}
      <motion.div variants={waterFall} custom={1.2}>
        <Link
          state={{ data: navLinks }}
          to={`${navLinks?.links?.[2].path || "#works"}`}
        >
          <div className="flex flex-col items-center">
            <ChevronsDown
              className="text-white bg-black rounded-full backdrop-blur-xl backdrop-filter bg-opacity-20 animate-bounce"
              size={72}
            />
            <span className="text-xs text-white animate-pulse opacity-20 font-unbounded">
              Explore
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
