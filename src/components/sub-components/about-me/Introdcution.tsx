import { waterFall } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      custom={0.2} // Controls delay for paragraph fade-in
      className="space-y-8 w-[32.19rem] leading-[1.8rem] text-[1rem] font-normal tracking-normal self-start"
    >
      <motion.p custom={0.2} variants={waterFall}>
        Hello, I'm yacine!
      </motion.p>
      <motion.p custom={0.4} variants={waterFall}>
        I’m a software engineer and a self-taught full-stack developer based in
        Tunis, Tunisia. I can develop responsive websites from scratch and raise
        them into modern user-friendly web experiences.
      </motion.p>
      <motion.p custom={0.6} variants={waterFall}>
        Transforming my creativity and knowledge into websites has been my
        passion for years. I have been helping various clients to establish
        their presence online. I always strive to learn about the newest
        technologies and frameworks.
      </motion.p>
      <motion.div custom={0.8} variants={waterFall}>
        <Button
          className="group w-[9.25rem] dark:text-white text-black border-[1px] border-purple-400 rounded-none 
          hover:bg-purple-500/20 hover:transition-all hover:duration-250 bg-transparent"
          type="button"
          asChild
        >
          <Link to="/about-me">
            Read more
            <span className="text-purple-400 dark:group-hover:text-purple-400 group-hover:animate-pulse group-hover:text-black">
              {"->"}
            </span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
