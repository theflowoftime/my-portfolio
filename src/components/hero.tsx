import React, { useRef } from "react";
import { Button } from "./ui/button";
import LogoHero from "./ui/icons/Logo-Hero";
import { motion, Variants } from "framer-motion";
import Matrix from "./ui/matrix-shape-generator";
import useHero from "@/hooks/useHero";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6 },
  }),
};

function Rectangle() {
  return (
    <div className="md:block hidden absolute bottom-20 right-0 border-[1px] border-r-0 border-gray-500 h-[5.69rem] w-[5.69rem]" />
  );
}

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(heroData);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col mb-8 relative overflow-hidden">
      <Rectangle />
      <div className="flex gap-x-2 mt-4 container lg:flex-row flex-col lg:gap-y-4 items-center">
        <motion.div
          className="lg:w-1/2 space-y-8 dark:text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          custom={2.7}
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

          <Button className="lg:block hidden text-white border-[1px] font-medium border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-500">
            {heroData?.buttonContent} !!
          </Button>
        </motion.div>

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
              transition: { duration: 0.6, ease: "easeInOut" },
            },
          }}
        >
          <div className="relative">
            <LogoHero className="absolute top-[25%] -z-10" />
            <Matrix rows={5} columns={5} />
            <img
              className="h-auto max-w-full mx-auto"
              src={"/hero.png"}
              alt="hero"
            />
          </div>
          <motion.div
            variants={textVariants}
            custom={2.7}
            className="border-[1px] border-gray-500 flex items-center gap-x-2 px-2 leading-[2rem] mr-4 ml-6 tracking-wider font-normal w-[27rem]"
          >
            <div className="h-4 w-4 bg-purple-400 inline-block" />
            {heroData?.imageSubtitle}{" "}
            <span className="dark:text-white">
              {heroData?.currentProject}...
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="container flex justify-center w-full mt-[7rem] dark:text-white mb-4"
      >
        {heroData?.quotes.map((_quote) => (
          <motion.div
            className="px-2 w-[80%] max-w-full text-center flex flex-col"
            key={_quote._key}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, root: scrollRef }}
            variants={textVariants}
            custom={2.7}
          >
            <motion.q
              className="text-2xl py-8 px-4 border border-gray-500 relative 
                         before:content-['“'] after:content-['“'] before:text-6xl after:text-6xl before:text-gray-400 
                         motion-safe:before:animate-in before:duration-300 
                       after:text-gray-400 before:absolute after:absolute before:-top-4 before:left-4 after:-bottom-4 after:right-4 
                         dark:before:bg-primary dark:after:bg-primary before:bg-background after:bg-background before:h-8 after:h-8"
            >
              {_quote.quote}
            </motion.q>
            <motion.p className="text-xl py-8 px-4 border border-t-0 self-end border-gray-500">
              — {_quote.author}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
