import { useMemo } from "react";
import {
  cn,
  getRandomColor,
  getRandomOffset,
  getRandomRotation,
} from "@/lib/utils";
import { motion, Variants } from "framer-motion";
const SHAPE = "•";

const Matrix = ({
  className,
  rows,
  columns,
}: {
  className?: string;
  rows: number;
  columns: number;
}) => {
  const initialPositions = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomOffset(1000)),
    [rows, columns]
  );

  const colors = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomColor()),
    [rows, columns]
  );

  const rotations = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomRotation()),
    [rows, columns]
  );

  const matrixAnimation: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: initialPositions[index].x,
      y: initialPositions[index].y,
      color: colors[index], // Start with random color
      scaleX: 4, // Start stretched in x-axis to form a "line"
      rotate: rotations[index], // Random initial rotation for each line
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      color: "#FFFFFF", // Target color transition
      scaleX: 1, // Shrink back to original scale (point)
      rotate: 0, // Rotate back to 0 for alignment
      transition: {
        duration: 1.5,
        delay: index * 0.05,
        color: { duration: 3 }, // Smooth color transition
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      className={cn("grid gap-5 w-[5.25rem] h-[5.25rem]", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          className="flex items-center justify-center w-1 h-1 text-opacity-50 rounded-full text-primary-foreground dark:text-white"
          style={{
            textShadow: "0px 0px 8px rgba(255,255,255,0.7)", // Glow effect for "light trail" look
            fontSize: "1.5rem", // Increase size slightly for visibility
          }}
          variants={matrixAnimation}
        >
          {SHAPE}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Matrix;
