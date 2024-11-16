import React, { cloneElement, ComponentPropsWithoutRef, useRef } from "react";
import { Button } from "./ui/button";
import LogoHero from "./ui/custom/icons/Logo-Hero";
import { motion } from "framer-motion";
import Matrix from "./ui/custom/matrix-shape-generator";
import useHero from "@/hooks/useHero";
import Github from "./ui/custom/icons/Github";
import Dribble from "./ui/custom/icons/Dribble";
import Figma from "./ui/custom/icons/Figma";
import { Link } from "react-router-dom";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { Loader2 } from "lucide-react";
import { textVariants } from "@/lib/constants";

type Size = "md" | "lg";
type SocialIconsProps = { size?: Size };

export const SocialIcons = ({
  className,
  size,
}: ComponentPropsWithoutRef<"div"> & SocialIconsProps) => {
  const icons = [
    { component: <Github />, mdClass: "w-[42px] h-[40px]" },
    { component: <Dribble />, mdClass: "w-[46px] h-[46px]" },
    { component: <Figma />, mdClass: "w-[28px] h-[40px]" },
  ];

  return (
    <div className={className}>
      {icons.map((icon, index) =>
        cloneElement(icon.component, {
          className: size === "md" ? icon.mdClass : undefined,
          key: index,
        })
      )}
    </div>
  );
};

function Rectangle() {
  return (
    <div
      className="md:block hidden absolute bottom-20 right-0 shadow-sm shadow-black 
     h-[5.69rem] w-[5.69rem] bg-clip-padding bg-opacity-10"
    />
  );
}

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const { navLinks } = useCachedNavLinks();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) return;
  <div className="relative flex flex-col min-h-screen overflow-hidden bg-clip-padding backdrop-filter bg-opacity-20 bg-neutral-900">
    <Loader2 />
  </div>;

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-clip-padding backdrop-filter bg-opacity-20 bg-neutral-900">
      <Rectangle />
      <div className="container flex flex-col items-center mt-4 gap-x-2 lg:flex-row lg:gap-y-4">
        {/* Main Text Section */}
        <motion.div
          className="lg:w-1/2 space-y-4 text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          custom={0.2} // Delay for sequential text appearance
        >
          <h3 className="text-4xl leading-[3rem] tracking-normal font-bold">
            <span>{heroData?.intro} </span>
            {heroData?.jobs.map((job, idx) => {
              const isLast = idx === heroData.jobs.length - 1;
              const isSecondLast = idx === heroData.jobs.length - 2;
              const sep = isLast
                ? ""
                : isSecondLast
                ? ` ${heroData.separator} a `
                : ", ";

              return (
                <React.Fragment key={job + idx}>
                  <span className="text-primary-foreground text-effect">
                    {job}
                  </span>
                  <span> {!isLast && sep}</span>
                </React.Fragment>
              );
            })}
          </h3>
          <p className="text-white/70 leading-[1.5rem] tracking-tight text-base font-light">
            {heroData?.bio}
          </p>

          <Button
            type="button"
            className="hidden lg:flex py-4 px-8 rounded-none justify-center items-center bg-transparent shadow-sm  font-medium text-white w-[10.25rem] border-[1px] border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-250"
            asChild
          >
            <Link
              className="text-lg"
              to={navLinks?.links?.[3].path || "#contact"}
            >
              {heroData?.buttonContent}
            </Link>
          </Button>
        </motion.div>

        {/* Hero Image and Matrix Animation */}
        <motion.div
          className="flex flex-col mt-[3.13rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.8 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.8, ease: "easeInOut", delay: 0.6 },
            },
          }}
        >
          <div className="relative">
            <LogoHero className="absolute top-[25%] -z-10" />
            <Matrix
              className="absolute bottom-12 right-10"
              rows={5}
              columns={5}
            />
            <img
              className="h-auto max-w-full mx-auto"
              src={"/hero.png"}
              alt="hero"
            />
          </div>
          <motion.div
            variants={textVariants}
            custom={0.9} // Delayed appearance for caption under the image
            className="flex items-center gap-x-2 py-1 px-2 leading-[2rem] tracking-wider font-normal w-fit mx-auto
            bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 rounded-b-md mix-blend-lighten
            "
          >
            <div className="inline-block w-3 h-3 bg-purple-400 rounded-full" />
            <span className="text-center text-white/80 whitespace-nowrap">
              {heroData?.imageSubtitle}{" "}
            </span>
            <span className="text-white">{heroData?.currentProject}...</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Quotes Section */}
      <div
        ref={scrollRef}
        className="container flex justify-center w-full mt-[7rem] dark:text-white mb-4"
      >
        {heroData?.quotes.map((_quote, idx) => (
          <motion.div
            className="px-2 w-[80%] max-w-full text-center flex flex-col"
            key={_quote._key}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, root: scrollRef }}
            variants={textVariants}
            custom={idx * 0.2 + 1.0} // Staggered delay for each quote
          >
            <motion.q
              className="text-2xl py-8 px-4 relative text-white
                         before:absolute before:content-['“'] after:content-['“'] before:text-6xl after:text-6xl before:text-gray-400 
                         motion-safe:before:animate-in before:duration-300 
                       after:text-gray-400  after:absolute before:-top-4 before:left-4 after:-bottom-4 after:right-4 
                         before:h-8 after:h-8
                         bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10
                         shadow-sm shadow-black rounded-md z-10
                         "
            >
              {_quote.quote}
            </motion.q>
            <motion.p className="self-end px-4 py-8 text-xl text-white bg-white rounded-md shadow-sm bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-black">
              — {_quote.author}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
