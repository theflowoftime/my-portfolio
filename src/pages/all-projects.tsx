import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Projects } from "@/types/types";
import { Link, useOutletContext } from "react-router-dom";

import { motion } from "framer-motion";

export default function AllProjects() {
  const language = useLanguageStore((state) => state.language);

  const projects: Projects =
    useOutletContext() || queryClient.getQueryData(["projects", language]);

  console.log(projects);

  return (
    <div className="grid grid-cols-[repeat(2_minmax(50px_1fr))] auto-rows-fr h-min w-full gap-y-10">
      {projects.map((project) => (
        <div className="contents outline" key={project._id}>
          <div>
            <Link to="">
              {project.title}
              {/* image1 */}
              <motion.div></motion.div>
              {/* image2 */}
              <motion.div></motion.div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
