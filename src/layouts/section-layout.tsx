import { HTMLProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  className,
  slug,
  children,
}: HTMLProps<"div"> & { slug: string }) => {
  return (
    <div
      className={cn("relative min-h-screen overflow-hidden mt-16", className)}
      id={slug}
    >
      <div className="container">
        <SectionTitle title={slug} />
        <div className="mt-16">{children}</div>
      </div>
    </div>
  );
};

export default SectionLayout;
