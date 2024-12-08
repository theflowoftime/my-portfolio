import { useCursorStore } from "@/stores/cursor-store";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  textContent,
}: {
  textContent: string;
}) {
  const animateCursor = useCursorStore((state) => state.animateCursor);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative inline-block w-full"
      onMouseEnter={() => animateCursor("buttonHover")}
      onMouseLeave={() => animateCursor("cursorEnter")}
    >
      <Button
        variant="outline"
        className="relative w-full h-full px-6 py-4 overflow-hidden bg-transparent border-black/20 group hover:bg-transparent dark:border-white/20"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      >
        {/* Text */}
        <div className="z-10 flex items-center pointer-events-none gap-x-2">
          <span className="relative text-[1.25rem] tracking-[5%] font-medium text-black uppercase transition-colors duration-200 delay-150 dark:text-white group-hover:text-white dark:group-hover:text-black font-jura">
            {textContent}
          </span>
          <ArrowRight
            size={24}
            className="transition-colors duration-200 delay-150 group-hover:stroke-white dark:group-hover:stroke-black dark:stroke-white group-hover:-rotate-45"
          />
        </div>

        {/* Animated Background */}
        <motion.span
          className="absolute inset-0 w-full h-full dark:bg-white bg-black origin-[50%_50%_0px]"
          style={{ willChange: "transform" }}
          variants={{
            rest: {
              scale: 0.2,
              opacity: 0,
              borderRadius: "600px",
            },
            hover: {
              scale: 1,
              opacity: 1,
              borderRadius: "0px",
              transition: {
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              },
            },
          }}
        />
      </Button>
    </motion.div>
  );
}
