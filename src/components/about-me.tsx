import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionLayout from "@/layouts/section-layout";
import Decorations from "./sub-components/about-me/decorations";
import useNavLinks from "@/hooks/useNavLinks";
import { Badge } from "./ui/badge";

import { useDragControls } from "framer-motion";
import { Separator } from "./ui/separator";
import { MoveRight } from "lucide-react";
import { waterFall } from "@/lib/framer-variants";

const experiences = [
  {
    _id: 1,
    role: "Freelance Practice",
    company: "Yacine Co.",
    start: "2017",
    end: "Now",
  },

  {
    _id: 2,
    role: "Frontend Developer",
    company: "Pi-2r",
    start: "2022",
    end: "2022",
  },
  {
    _id: 3,
    role: "Fullstack Developer",
    company: "Pi-2r",
    start: "2022",
    end: "2024",
  },
  {
    _id: 4,
    role: "Junior Developer",
    company: "Poulina Group",
    start: "2018",
    end: "2019",
  },
  {
    _id: 5,
    role: "Senior Developer",
    company: "Poulina Group",
    start: "2019",
    end: "2020",
  },
];

function AboutMe() {
  const { data: navLinks } = useNavLinks();
  const slug = navLinks?.links?.[1].slug || "about-me";

  const controls = useDragControls();
  const constraintsRef = useRef(null);

  const whatIdo =
    "I help startups and enterprise to establish an emotional connection between their products and happy engaged customers";

  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = whatIdo.split(" ");

  const wordElements = words.map((word, index) => {
    const totalWords = words.length;

    // Slight padding to ensure smooth scroll animation
    const start = (index / totalWords) * 0.9; // Scales total progress down slightly
    const end = ((index + 1) / totalWords) * 0.9;

    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

    return (
      <motion.span key={index} style={{ opacity }}>
        {word}{" "}
      </motion.span>
    );
  });

  return (
    <SectionLayout slug={slug} url="/about-me.jpg">
      <Decorations />
      <div className="flex flex-col items-center justify-center gap-y-16">
        <div className="relative flex flex-col items-center justify-center gap-y-8">
          <div className="flex flex-col flex-wrap items-center gap-y-4">
            <div className="flex flex-col items-center space-y-4 text-center font-instrument">
              <h3
                ref={containerRef}
                className="text-2xl before:content['']  before:w-16 before:h-[0.05rem] dark:before:bg-white/40 before:bg-black/80 text-purple-400 before:absolute before:top-1/2 before:left-[140%] 
            after:content[''] after:w-16 after:h-[0.05rem] dark:after:bg-white/40 after:bg-black after:absolute after:top-1/2 after:right-[140%] relative w-fit"
              >
                Hello!
              </h3>
              <motion.p className="text-pretty text-[3.25rem] leading-relaxed">
                {wordElements}
              </motion.p>
            </div>
          </div>

          <motion.div
            ref={constraintsRef}
            className="h-[15rem] max-w-max grid grid-cols-2 justify-between items-center gap-y-4 gap-x-24 cursor-grab"
            style={{
              perspective: "1400px", // Ensures perspective for 3D effect
            }}
          >
            {Array.from([
              "Prototyping",
              "UI/UX Design",
              "Agile Dev",
              "Product  Roadmap",
              "Data Analytics",
              "User Reasearch",
            ]).map((keyword, index) => (
              <motion.div
                key={keyword}
                drag
                dragConstraints={constraintsRef}
                initial={{
                  opacity: 0,
                  x: 50 * ((index + 1) % 2 ? 1 : -1),
                  rotateY: `${60 * ((index + 1) % 2 ? 1 : -1)}deg`,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 10,
                  },
                }}
                viewport={{ once: true }}
                whileDrag={{
                  rotateY: 0,
                  transition: {
                    type: "spring",
                    stiffness: 10,
                  },
                }}
                className="cursor-grab w-fit h-fit"
              >
                <Badge
                  className="px-6 py-3 italic shadow-md select-none font-unbounded dark:shadow-white shadow-black"
                  variant="outline"
                >
                  {keyword}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={waterFall} // Define stagger children in the parent
          className="flex flex-col items-center w-full space-y-16 text-center"
        >
          <h3
            className="text-2xl font-instrument before:content[''] before:w-16 before:h-[0.05rem] dark:before:bg-white/40 before:bg-black/80 text-purple-400 before:absolute before:top-1/2 before:left-[140%] 
            after:content[''] after:w-16 after:h-[0.05rem] dark:after:bg-white/40 after:bg-black after:absolute after:top-1/2 after:right-[140%] relative w-fit"
          >
            Experience
          </h3>
          <motion.div className="flex flex-col w-full gap-y-32 font-unbounded">
            {experiences.map(({ role, company, start, end, _id }) => (
              <div key={_id}>
                <motion.div
                  variants={waterFall}
                  className="grid justify-between grid-cols-3 justify-items-center"
                >
                  <span>{role}</span>
                  <span>{company}</span>
                  <span>
                    {start} <MoveRight className="inline-block" /> {end}
                  </span>
                </motion.div>
                <motion.div variants={waterFall}>
                  <Separator className="min-w-full bg-white/40" />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
