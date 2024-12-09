import { useLanguageStore } from "@/stores/language-store";
import { Contact } from "@/types/types";
import { useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UseMarqueeOptions {
  speed: number;
}

export function useMarquee({ speed }: UseMarqueeOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [animationDistance, setAnimationDistance] = useState(0);
  const repeatCount = useRef<number>(1);
  const controls = useAnimationControls();

  // Function to update dimensions of the container and text
  const updateDimensions = () => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;

      // Only proceed if valid dimensions are available
      if (containerWidth > 0 && textWidth > 0) {
        repeatCount.current = Math.ceil(containerWidth / textWidth) + 1;

        setAnimationDistance(textWidth);
      }
    }
  };

  useEffect(() => {
    updateDimensions();
    // Set up ResizeObserver for dynamic updates
    const observer = new ResizeObserver(updateDimensions); //Update on resize

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  useEffect(() => {
    if (animationDistance > 0) {
      const duration = animationDistance / speed;

      controls.start({
        x: -animationDistance,
        transition: {
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      });
    }
  }, [animationDistance, controls, speed]);

  return {
    containerRef,
    controls,
    textRef,
    repeatCount: repeatCount.current,
  };
}

export default function Marquee({ contactData }: { contactData: Contact }) {
  const language = useLanguageStore((state) => state.language);
  const speed = 40;
  const { containerRef, textRef, repeatCount, controls } = useMarquee({
    speed,
  });

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      className={cn(
        "lg:text-[9rem] md:text-[6rem] text-[3rem] will-change-transform uppercase whitespace-nowrap font-unbounded",
        language === "AR" && "text-[12rem] font-baloo"
      )}
    >
      {[...Array(repeatCount)].map((_, index) => (
        <span ref={index === 0 ? textRef : undefined}>
          {contactData?.HeaderWords?.map(({ word, isHighlighted }) => (
            <span
              key={word}
              className={cn(isHighlighted && "!text-purple-500")}
            >
              {word}{" "}
            </span>
          ))}{" "}
        </span>
      ))}
    </motion.div>
  );
}
