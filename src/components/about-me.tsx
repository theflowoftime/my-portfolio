import { Button } from "./ui/button";
import Matrix from "./ui/matrix-shape-generator";
import { motion } from "framer-motion";
import SectionLayout from "@/layouts/section-layout";
import { Link } from "react-router-dom";
import useNavLinks from "@/hooks/useNavLinks";
import { textVariants } from "@/lib/constants";

const Rectangle = () => {
  return (
    <div
      className="md:block hidden absolute top-[15%] -translate-x-1/2 left-0 shadow-sm shadow-black h-[9.69rem] w-[9.69rem] 
                 before:content-[''] before:absolute before:inset-0 before:-z-10
         before:bg-gradient before:bg-[length:400%_400%] before:opacity-90 before:animate-gradient"
    />
  );
};

function AboutMe() {
  const { data: navLinks } = useNavLinks();
  const slug = navLinks?.links?.[1].slug || "about-me";

  return (
    <SectionLayout slug={slug}>
      <Rectangle />
      <Matrix
        className="absolute right-0 hidden md:grid top-1/2"
        rows={5}
        columns={5}
      />
      <div className="relative flex flex-col overflow-hidden gap-y-4">
        {/* Content Animation */}
        <div className="flex flex-col flex-wrap items-center justify-between lg:flex-row gap-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            custom={0.2} // Controls delay for paragraph fade-in
            className="space-y-8 w-[32.19rem] leading-[1.8rem] text-[1rem] font-normal tracking-normal self-start"
          >
            <motion.p custom={0.2} variants={textVariants}>
              Hello, I'm yacine!
            </motion.p>
            <motion.p custom={0.4} variants={textVariants}>
              I’m a software engineer and a self-taught full-stack developer
              based in Tunis, Tunisia. I can develop responsive websites from
              scratch and raise them into modern user-friendly web experiences.
            </motion.p>
            <motion.p custom={0.6} variants={textVariants}>
              Transforming my creativity and knowledge into websites has been my
              passion for years. I have been helping various clients to
              establish their presence online. I always strive to learn about
              the newest technologies and frameworks.
            </motion.p>
            <motion.div custom={0.8} variants={textVariants}>
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

          {/* Image Animation */}
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
            <Matrix
              className="absolute top-[4rem] -left-4"
              rows={5}
              columns={5}
            />
            <Matrix className="absolute top-1/2 right-8" rows={4} columns={5} />
            <img
              className="h-auto max-w-full mx-auto border-b-2 border-b-purple-400"
              src="/about-me.png"
              alt="about-me"
            />
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
