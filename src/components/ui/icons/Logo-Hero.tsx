import { SVGProps } from "react";
import { motion } from "framer-motion";

const LogoHero = ({ className }: SVGProps<SVGSVGElement>) => {
  const strokeStyle = {
    stroke: "#C778DD", // Base color for the stroke
    strokeWidth: 4, // Adjust stroke width as needed
    fill: "none", // Ensure no fill for the path
  };

  const leftCAnimation = {
    hidden: {
      x: -50,
      opacity: 0,
      scale: 0.8,
      strokeWidth: 2,
      strokeDasharray: 200,
      strokeDashoffset: 200,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      strokeWidth: 8,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      transition: { duration: 1.2, delay: 2 },
    },
  };

  const rightCAnimation = {
    hidden: {
      x: 50,
      opacity: 0,
      scale: 0.8,
      strokeWidth: 2,
      strokeDasharray: 200,
      strokeDashoffset: 200,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      strokeWidth: 4,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      transition: { duration: 1.2, delay: 2 },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="156"
      height="156"
      viewBox="0 0 156 156"
      className={className}
    >
      {/* Left C */}
      <motion.path
        d="M0 39.75h77.5V78.5H38.75v38.75H77.5V156H0V39.75Z"
        style={strokeStyle}
        initial="hidden"
        animate="visible"
        variants={leftCAnimation}
        whileHover="whileHover"
      />
      {/* Right C (flipped horizontally) */}
      <motion.path
        d="M77.5 1H155v116.25H77.5V78.5h38.75V39.75H77.5V1Z"
        style={strokeStyle}
        initial="hidden"
        animate="visible"
        variants={rightCAnimation}
        whileHover="whileHover"
      />
    </motion.svg>
  );
};

export default LogoHero;
