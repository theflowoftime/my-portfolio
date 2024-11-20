import { motion, Variants } from "framer-motion";
import { type Hero } from "@/types/types";
import LogoHero from "../icons/Logo-Hero";
import Matrix from "../matrix-shape-generator";

const variants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function RightSide({ heroData }: { heroData: Hero }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="flex flex-col mt-[3.13rem]"
    >
      <motion.div className="relative" variants={item}>
        <LogoHero className="absolute top-[25%] -z-10" />
        <Matrix className="absolute bottom-12 right-10" rows={5} columns={5} />
        <img
          className="h-auto max-w-full mx-auto"
          src={"/hero.png"}
          alt="hero"
        />
      </motion.div>
      <motion.div
        className="flex items-center gap-x-2 py-1 px-2 leading-[2rem] tracking-wider font-normal w-fit mx-auto
        bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 rounded-b-md mix-blend-lighten
        "
        variants={item}
      >
        <div className="inline-block w-3 h-3 bg-purple-400 rounded-full" />
        <span className="text-center text-white/80 whitespace-nowrap">
          {heroData?.imageSubtitle}{" "}
        </span>
        <span className="text-white">{heroData?.currentProject}...</span>
      </motion.div>
    </motion.div>
  );
}
