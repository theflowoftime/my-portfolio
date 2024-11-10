import React, { cloneElement, useRef } from "react";
import { Button } from "./ui/button";
import LogoHero from "./ui/icons/Logo-Hero";
import { motion, Variants } from "framer-motion";
import Matrix from "./ui/matrix-shape-generator";
import useHero from "@/hooks/useHero";
import Github from "./ui/icons/Github";
import Dribble from "./ui/icons/Dribble";
import Figma from "./ui/icons/Figma";
import { Link } from "react-router-dom";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6 },
  }),
};

type Size = "md" | "lg";
type SocialIconsProps = { size?: Size };

export const SocialIcons = ({ size }: SocialIconsProps) => {
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

  // if (isLoading) return <div>loading...</div>

  return (
    <div className="relative flex flex-col overflow-hidden">
      <Rectangle />
      <div className="container flex flex-col items-center mt-4 gap-x-2 lg:flex-row lg:gap-y-4">
        {/* Main Text Section */}
        <motion.div
          className="lg:w-1/2 space-y-8 dark:text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          custom={0.2} // Delay for sequential text appearance
        >
          <h3 className="text-[2rem] leading-[3rem] tracking-normal">
            {heroData?.intro}{" "}
            {heroData?.jobs.map((job, idx) => {
              const isLast = idx === heroData.jobs.length - 1;
              const isSecondLast = idx === heroData.jobs.length - 2;
              const sep = isLast
                ? ""
                : isSecondLast
                ? ` ${heroData.separator} `
                : ", ";

              return (
                <React.Fragment key={job + idx}>
                  <span className="text-primary-foreground">{job}</span>
                  {!isLast && sep}
                </React.Fragment>
              );
            })}
          </h3>
          <p className="text-foreground leading-[1.5625rem] text-[1rem] font-normal">
            {heroData?.bio}
          </p>

          <Button
            type="button"
            className="hidden font-medium dark:text-white rounded-none lg:block border-[1px] border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-250"
          >
            <Link to={navLinks?.links?.[3].path || "#contact"}>
              {heroData?.buttonContent} !!
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
            className="flex items-center gap-x-2 p-2 leading-[2rem] mr-4 ml-2 tracking-wider font-normal
            bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-sm shadow-black
            "
          >
            <div className="inline-block w-4 h-4 bg-purple-400" />
            {heroData?.imageSubtitle}{" "}
            <span className="dark:text-white">
              {heroData?.currentProject}...
            </span>
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
              className="text-2xl py-8 px-4 relative 
                         before:absolute before:content-['“'] after:content-['“'] before:text-6xl after:text-6xl before:text-gray-400 
                         motion-safe:before:animate-in before:duration-300 
                       after:text-gray-400  after:absolute before:-top-4 before:left-4 after:-bottom-4 after:right-4 
                         dark:before:bg-transparent dark:after:bg-transparent before:h-8 after:h-8
                         bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10
                         shadow-sm shadow-black rounded-md z-20
                         "
            >
              {_quote.quote}
            </motion.q>
            <motion.p className="self-end px-4 py-8 text-xl bg-white rounded-md shadow-sm bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-black">
              — {_quote.author}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
