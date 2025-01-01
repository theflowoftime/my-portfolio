import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Language, Projects } from "@/types/types";
import { Link, useOutletContext } from "react-router-dom";

import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/lib/utils";

export const cachedProjects = (language: Language): Projects =>
  useOutletContext() || queryClient.getQueryData(["projects", language]);

export default function AllProjects() {
  const language = useLanguageStore((state) => state.language);

  const projects: Projects = cachedProjects(language) || useProjects(language);

  console.log(projects);

  return (
    <div className="grid w-full grid-cols-2 gap-10 mt-16 auto-rows-fr h-min">
      {projects.map((project, index) => (
        <div className="contents" key={index}>
          <div className="relative self-start w-full h-full justify-self-start">
            <Link
              className="flex flex-col h-min flex-nowrap gap-y-4"
              to={`/projects/${project.title}`}
              state={{ _id: project._id }}
            >
              <motion.div className="aspect-[1.33/1] w-full h-full relative overflow-hidden rounded-3xl">
                {/* image1 */}
                <motion.div className="origin-[50%_50%_0px] w-full h-full absolute top-0 left-0">
                  <div className="absolute inset-0">
                    <img
                      className="block object-cover object-center w-full h-full"
                      src={urlFor(project.images.thumbnails[0]).url()}
                      alt=""
                    />
                  </div>
                </motion.div>

                {/* image2 */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                    transformOrigin: "50% 50% 0px",
                  }}
                  transition={{
                    duration: 0.5,
                    type: "tween",
                    ease: "easeInOut",
                    stiffness: 200,
                  }}
                >
                  <div className="absolute inset-0">
                    <img
                      className="block object-cover object-center w-full h-full"
                      src={urlFor(project.images.thumbnails[1]).url()}
                      alt=""
                    />
                  </div>
                </motion.div>
              </motion.div>

              <div className="flex w-full gap-x-2">
                <h2 className="flex-1 font-unbounded -tracking-[0.03em]">
                  {project.title}
                </h2>
                <div className="space-x-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge
                      variant="outline"
                      className="text-[0.75rem] font-light px-3"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
