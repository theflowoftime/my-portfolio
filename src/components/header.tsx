import Hero from "./hero";
import NavBar from "./ui/navbar";

import { motion } from "framer-motion";

function Header() {
  return (
    <div className="relative min-h-screen ">
      <motion.header
        initial="hidden"
        whileInView="visible"
        transition={{
          velocity: {
            type: "spring",
            velocity: 20,
          },
          duration: 0.8,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: "-100%" },
          visible: { opacity: 1, y: "0%" },
        }}
        className="min-h-screen relative overflow-hidden z-10 bg-gradient bg-[length:200%_200%] animate-gradient 
        bg-neutral-900 bg-clip-padding backdrop-filter bg-opacity-20"
      >
        <NavBar />
        <Hero />
      </motion.header>
    </div>
  );
}

export default Header;
