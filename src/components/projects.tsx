// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/stores/language-store";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "./sub-components/animated-button";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { log } from "console";

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

  // useInView

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

  console.log("projects", projects);

  if (isLoading || !projects) return <SectionLayout slug={slug} />;
  if (error) return <p>Error fetching projects: {error.message}</p>;

  return (
    <SectionLayout ref={targetRef} slug={slug}>
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
              className={cn(
                `sm:sticky static group h-[25rem] w-full font-unbounded grid grid-cols-1 sm:grid-cols-2 gap-x-8 justify-between shadow-md rounded-lg bg-background  p-2`,
                language === "AR" && "font-baloo"
              )}
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
                className="relative overflow-hidden transition-all duration-1000 ease-in bg-no-repeat bg-contain rounded-lg sm:bg-cover h-96"
                size="lg"
                image={project.images.thumbnails[0]}
              >
                <Link
                  className="flex items-center justify-between h-full gap-x-2 "
                  to={`/projects/${project.title}`}
                  state={{ _id: project._id }}
                >
                  <Button className="absolute group/button p-4 transition-all dark:text-white bg-background hover:text-white text-black duration-300 -translate-x-1/2 translate-y-[200%] w-fit bottom-2 left-1/2 right-1/2 group-hover:translate-y-0 ease">
                    <span>View Project</span>
                    <ArrowRightCircle className="transition-transform ease-in group-hover/button:rotate-90" />
                  </Button>
                </Link>
              </LazyBackground>

              {/* Project Details */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col text-3xl font-extrabold gap-y-2">
                  <span>{project.title}</span>
                  {/* Badges */}
                  <div className="flex text-xs gap-x-2">
                    {project.stack.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="font-light"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-base font-light leading-relaxed text-pretty font-fira">
                  {project.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-full mt-24 md:mt-0"
          viewport={{ once: true, amount: "all" }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.6 }}
        >
          <Link className="w-full" to="/projects/all">
            <AnimatedButton textContent="all projects" />
          </Link>
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default Projects;
