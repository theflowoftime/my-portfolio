import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <motion.h3
      initial={{ opacity: 0, x: "-15%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeIn", duration: 0.6, delay: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      className="text-3xl font-medium"
    >
      <span className="text-purple-400">#</span>
      <span
        className="dark:text-white absolute ml-1 after:content-[''] after:block after:w-[20.38rem] after:h-[2px] 
        after:mx-4 after:bg-purple-400 after:absolute after:top-1/2 after:left-full after:-translate-y-1/2"
      >
        {title}
      </span>
    </motion.h3>
  );
};

const SectionLayout = ({
  slug,
  children,
}: PropsWithChildren & { slug: string }) => {
  return (
    <div
      className="relative min-h-screen py-16 overflow-hidden dark:bg-neutral-950"
      id={slug}
    >
      <div className="container">
        <SectionTitle title={slug} />
        {children}
      </div>
    </div>
  );
};

export default SectionLayout;
