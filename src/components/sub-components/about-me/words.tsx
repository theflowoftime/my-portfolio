import { memo, useMemo } from "react";
import { motion } from "framer-motion";

const Words = memo(
  ({ words, progression }: { words: string[]; progression: number }) => {
    return useMemo(
      () =>
        words?.map((word, index) => {
          const visibilityThreshold = progression * words.length * 1.2;
          const fadeMargin = 4; // Adjust for smoother transitions
          const opacity =
            index < visibilityThreshold
              ? 1
              : index < visibilityThreshold + fadeMargin
              ? (fadeMargin - (index - visibilityThreshold)) / fadeMargin
              : 0.1;

          // Interpolate blur based on progression
          const blur =
            index < visibilityThreshold
              ? 0
              : index < visibilityThreshold + fadeMargin
              ? 5 *
                (1 - (fadeMargin - (index - visibilityThreshold)) / fadeMargin)
              : 10;

          return (
            <motion.span
              key={index}
              style={{
                opacity,
                filter: `blur(${blur}px)`, // Add blur dynamically
                transition: "opacity 0.6s ease-in-out, filter 0.6s ease-in-out",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        }),
      [words, progression]
    );
  }
);

export default Words;
