import { SVGProps } from "react";
import { motion } from "framer-motion";
import {
  pathVariants,
  strokeStyleL,
  strokeStyleR,
} from "@/lib/framer-variants";

const LogoHero = ({ className }: SVGProps<SVGSVGElement>) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="156"
      height="156"
      viewBox="0 0 156 156"
      initial="hidden"
      whileInView="visible"
      className={className}
      style={{ rotate: -45 }}
    >
      {/* Left C */}
      <motion.path
        d="M0 39.75h77.5V78.5H38.75v38.75H77.5V156H0V39.75Z"
        style={strokeStyleL}
        viewport={{ once: true }}
        variants={pathVariants}
        custom={0.5}
      />
      {/* Right C (flipped horizontally) */}
      <motion.path
        d="M77.5 1H155v116.25H77.5V78.5h38.75V39.75H77.5V1Z"
        style={strokeStyleR}
        variants={pathVariants}
        custom={1}
      />
    </motion.svg>
  );
};

export default LogoHero;
