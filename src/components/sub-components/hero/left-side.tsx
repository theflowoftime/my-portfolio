import { motion } from "framer-motion";
import { type Hero } from "@/types/types";
import { waterFall } from "@/lib/framer-variants";
import React from "react";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

export function LeftSide({
  heroData,
  navLinks,
}: {
  heroData: Hero;
  navLinks: any;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:w-1/2 space-y-4 text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start"
    >
      <motion.h3
        variants={waterFall}
        custom={0.2}
        className="text-4xl leading-[3rem] tracking-normal font-bold"
      >
        <motion.span variants={waterFall} custom={0.4}>
          {heroData?.intro}{" "}
        </motion.span>
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
              <span className="text-primary-foreground text-effect">{job}</span>
              <span> {!isLast && sep}</span>
            </React.Fragment>
          );
        })}
      </motion.h3>
      <motion.p
        variants={waterFall}
        custom={0.6}
        className="text-white/70 leading-[1.5rem] tracking-tight text-base font-light"
      >
        {heroData?.bio}
      </motion.p>

      <motion.div variants={waterFall} custom={0.8}>
        <Button
          type="button"
          className="hidden lg:flex py-4 px-8 rounded-none justify-center items-center bg-transparent shadow-sm  font-medium text-white w-[10.25rem] border-[1px] border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-250"
          asChild
        >
          <Link
            state={{}}
            className="text-lg"
            to={navLinks?.links?.[3].path || "#contact"}
          >
            {heroData?.buttonContent}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
