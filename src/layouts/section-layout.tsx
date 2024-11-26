import { forwardRef, HTMLProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import LazyBackground from "@/components/sub-components/lazy-bg-img-sanity";

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
        className="dark:text-white relative ml-1 after:content-[''] after:block after:w-[20.38rem] after:h-[2px] 
        after:mx-4 after:bg-purple-400 after:absolute after:top-1/2 after:left-full after:-translate-y-1/2"
      >
        {title}
      </span>
    </motion.h3>
  );
};

const SectionLayout = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { slug: string; url?: string }
>(({ className, slug, url, children }, ref) => {
  return (
    <>
      {url ? (
        <div
          className="bg-cover bg-center h-[18.75rem] w-full bg-fixed"
          style={{ backgroundImage: `url(${url})` }}
        />
      ) : null}
      <div className={cn("relative overflow-hidden mb-16", className)}>
        <div ref={ref} className="container" id={slug}>
          {/* <SectionTitle title={slug} /> */}
          <div className="w-full h-full py-16">{children}</div>
        </div>
      </div>
    </>
  );
});

export default SectionLayout;
