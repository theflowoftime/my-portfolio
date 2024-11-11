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
        className="h-full min-h-screen relative overflow-hidden 
         bg-gradient bg-[length:400%_400%]  animate-gradient z-10"
      >
        <NavBar />
        <Hero />
      </motion.header>
    </div>
  );
}

export default Header;
