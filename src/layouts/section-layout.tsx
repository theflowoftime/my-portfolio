import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionLayout = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { slug: string; url?: string }
>(({ className, slug, children }, ref) => {
  // const targetRef = useRef<HTMLDivElement>(null);
  // const heroRef = useRef(document.getElementById("hero"));

  // const { scrollYProgress } = useScroll({
  //   target: heroRef,
  //   offset: ["start end", "end end"],
  // });

  // const y = useTransform(scrollYProgress, [0, 0.2], [0, "-200%"]);
  // const scale = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  // useEffect(() => {
  //   scrollYProgress.on("change", (progress) => console.log(progress));
  // }, []);

  return (
    <>
      <motion.div
        // ref={targetRef}
        // style={{
        //   perspective: 1200,
        //   y,
        //   scale,
        // }}
        ref={ref}
        // className={cn("relative overflow-hidden mb-16", className)}
        className={cn("relative mb-16", className)}
      >
        <div className="container" id={slug}>
          <div className="py-16">{children}</div>
        </div>
      </motion.div>
    </>
  );
});

export default SectionLayout;
