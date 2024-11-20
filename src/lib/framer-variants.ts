import { Variants } from "framer-motion";

export const waterFall: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export const strokeStyleR = {
  stroke: "#C778DD", // Base color for the stroke
  strokeWidth: 3, // Adjust stroke width as needed
  fill: "none", // Ensure no fill for the path
};

export const strokeStyleL = {
  stroke: "#fff", // Base color for the stroke
  strokeWidth: 3, // Adjust stroke width as needed
  fill: "none", // Ensure no fill for the path
};

export const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
