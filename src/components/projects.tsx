// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { useLanguageStore } from "@/stores/language-store";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AnimatedButton from "./sub-components/animated-button";
import { Link } from "react-router-dom";

// export type Project = {
//   _id: string;
//   title: string;
//   isPublic: boolean;
//   summary: string;
//   links: { repo: {button: {text: string; url: string}}; live: {button: {text: string; url: string}} };
//   images: SanityImageSource[];
//   status: "planned" | "on-going"|"delivered"
//   timeframe: {
//   started_at: Date;
//   delivered_at: Date;}
// stack: {
//   type: "front" | "back" | "full";
//   technologies: [];
// };
// tags: [];

// };

function Projects() {
  const { navLinks } = useCachedNavLinks();
  const slug = navLinks?.links?.[2].slug || "works";
  const language = useLanguageStore((state) => state.language);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [
      [0, 1],
      [1, 1],
    ],
  });

  const project1_scale = useTransform(
    scrollYProgress,
    [0.69, 0.75, 0.8, 1],
    [1, 0.99, 0.94, 0.85]
  );

  const project2_scale = useTransform(
    scrollYProgress,
    [0.74, 0.77, 1],
    [1, 0.99, 0.85]
  );
  const scales = [project1_scale, project2_scale];

  const { projects, isLoading, error } = useProjects(language);
  if (isLoading || !projects) return <SectionLayout slug={slug} />;
  if (error) return <p>Error fetching projects: {error.message}</p>;

  return (
    <SectionLayout ref={targetRef} slug={slug}>
      {/* <ProjectsCarousel /> */}
      <div className="flex flex-col items-center w-full gap-y-32">
        <div
          style={{
            perspective: "1200px",
          }}
          className="relative flex flex-col items-center gap-y-64"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className={`sticky group h-[25rem] w-full font-unbounded grid grid-cols-2 gap-x-8 justify-between shadow-md rounded-lg bg-background bg-opacity-50 p-2`}
              style={{
                top: `calc(${index * 50}px + 5rem)`,
                scale: scales[index] ? scales[index] : 1,
                opacity: scales[index] ? scales[index] : 1,

                // transform: `perspective(1200px) scale(${
                //   scales[index] ? scales[index] : 1
                // })`,
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                willChange: "transform",
                // opacity: 1,
              }}
            >
              {/* Project Image */}
              <LazyBackground
                className="relative overflow-hidden bg-no-repeat bg-contain rounded-lg"
                size="lg"
                image={project.image}
              >
                <Button className="absolute transition-all duration-300 -translate-x-1/2 translate-y-[200%] w-fit bottom-8 left-1/2 right-1/2 group-hover:translate-y-0 ease">
                  View Project
                </Button>
              </LazyBackground>

              {/* Project Details */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col text-3xl font-extrabold gap-y-2">
                  <span>Dolor amet</span>
                  <span>lorem</span>
                  {/* Badges */}
                  <div className="flex text-xs gap-x-2">
                    <Badge className="font-light" variant="outline">
                      JAVASCRIPT
                    </Badge>
                    <Badge className="font-light" variant="outline">
                      REACT
                    </Badge>
                  </div>
                </div>
                <p className="text-base font-light leading-relaxed text-pretty font-fira">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam, dolorem iure perspiciatis.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          viewport={{ once: true, amount: "all" }}
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 2 }}
        >
          <Link className="w-full" to="/projects">
            <AnimatedButton textContent="all projects" />
          </Link>
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default Projects;
