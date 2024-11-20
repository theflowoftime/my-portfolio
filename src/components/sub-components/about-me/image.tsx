import { motion } from "framer-motion";
import Matrix from "../matrix-shape-generator";

function Decorations() {
  return (
    <>
      <Matrix className="absolute top-[4rem] -left-4" rows={5} columns={5} />
      <Matrix className="absolute top-1/2 right-8" rows={4} columns={5} />
    </>
  );
}

export default function AboutMeImg() {
  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: "easeInOut", delay: 1.0 },
        },
      }}
    >
      <Decorations />
      <img
        className="h-auto max-w-full mx-auto border-b-2 border-b-purple-400"
        src="/about-me.png"
        alt="about-me"
      />
    </motion.div>
  );
}
