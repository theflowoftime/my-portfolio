import { Variants } from "framer-motion";

export const waterFall: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.4, // Controls delay between children
      duration: 2,
      delayChildren: 0.2,
      type: "spring",
    },
  },
};

export const ReversewaterFallContactForm: Variants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.6, // Controls delay between children
      duration: 1,
      // delayChildren: 0.2,
      type: "spring",
    },
  },
};

export const contactTitleBackFlip: Variants = {
  hidden: { opacity: 0, y: -50, rotate: "45deg" },
  visible: {
    rotate: 0, //
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.6, // Controls delay between children
      rotate: {
        type: "spring",
        stiffness: 50,
        damping: 1,
        duration: 1, // Duration for the rocking motion
      }, // Use spring for natural motion
    },
  },
};

export const strokeStyleR = {
  stroke: "#C778DD", // Base color for the stroke
  strokeWidth: 2, // Adjust stroke width as needed
  fill: "none", // Ensure no fill for the path
};

export const strokeStyleL = {
  stroke: "#fff", // Base color for the stroke
  strokeWidth: 2, // Adjust stroke width as needed
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

export const cursorVariants = {
  cursorEnter: {
    border: "1px solid #eeff00",
    boxShadow: "0 0 1px 0px #eeff00 inset, 0 0 1px 0px #eeff00",
    scale: 2,
    borderRadius: "50%",
    backgroundColor: "transparent",
    transition: {
      duration: 0.2,
    },
  },
  cursorLeave: {
    scale: 0,
    border: 0,
    backgroundColor: "transparent",
    transition: {
      duration: 0.2,
    },
  },
  // buttonHover: {
  //   scale: 1,
  //   backgroundColor: "#eeff00",
  //   borderRadius: "50%",
  // },
};
