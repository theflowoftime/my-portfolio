import ProjectsCarousel from "@/components/sub-components/projects/carousel-projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProject";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { urlFor } from "@/lib/utils";
import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Projects } from "@/types/types";
import { differenceInMonths } from "date-fns";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import { waterFall } from "@/lib/framer-variants";
import { Breadcrumb } from "@/components/sub-components/projects/breadcrumbs";

function Project() {
  const { projectName } = useParams();
  const { state } = useLocation();
  useScrollToTop(projectName);
  const language = useLanguageStore((state) => state.language);
  const projects: Projects =
    useOutletContext() || queryClient.getQueryData(["projects", language]);

  const project =
    projects?.find((project) => project._id === state._id) ||
    useProject(language, state._id).data;

  if (!project) return <div>404</div>;

  return (
    <div className="space-y-16 mb-32 relative">
      <Breadcrumb />
      <motion.div className="flex flex-col gap-y-16">
        {/* Info Showcase */}
        <motion.div
          className="flex flex-col gap-y-6 h-[calc(100vh_-_4.56rem)] justify-center -tracking-[0.02em]"
          variants={waterFall}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          <motion.div variants={waterFall}>
            <h1 className="text-[5.35rem] font-instrument ">{project.title}</h1>
            <motion.div className="flex font-mono gap-x-4" variants={waterFall}>
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[0.8rem] font-light px-3"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
          <motion.p
            className="font-mono font-light -tracking-[0.03em] leading-relaxed text-[1.25rem] opacity-60 w-full lg:w-1/2"
            variants={waterFall}
          >
            {project.summary}
          </motion.p>
          <motion.div variants={waterFall}>
            <Button
              className="px-5 py-6 text-white bg-black rounded-full w-fit"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.008) 0.565274px 0.565274px 1.75872px 0px, rgba(0, 0, 0, 0.02) 1.44525px 1.44525px 4.49656px 0px, rgba(0, 0, 0, 0.042) 2.89741px 2.89741px 9.01462px 0px, rgba(0, 0, 0, 0.08) 5.49248px 5.49248px 17.0886px 0px, rgba(0, 0, 0, 0.16) 10.9174px 10.9174px 33.967px 0px, rgba(0, 0, 0, 0.35) 24px 24px 74.6705px 0px, rgb(0, 0, 0) 0px -16px 48px 0px inset",
              }}
            >
              {project.links.live.button.text}
              <Link to={project.links.live.button.url} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Image 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full min-h-screen rounded-2xl"
          style={{
            backgroundImage: `url(${urlFor(
              project.images.thumbnails[0]
            ).url()})`,
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          variants={waterFall}
        />

        {/* Stack Section */}
        <motion.div
          className="flex justify-between"
          variants={waterFall}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div className="flex flex-col gap-y-2" variants={waterFall}>
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Services
              </em>
            </h3>
            {project.tags.map((service, index) => (
              <div key={service}>
                {service}
                {project.tags.length - 1 !== index ? "," : ""}
              </div>
            ))}
          </motion.div>

          <motion.div variants={waterFall}>
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Stack
              </em>
            </h3>
            {project.stack.technologies.map((stack, index) => (
              <span key={stack}>
                {stack}
                {project.stack.technologies.length - 1 !== index ? ", " : ""}
                {project.stack.technologies.length - 2 === index ? <br /> : ""}
              </span>
            ))}
          </motion.div>

          <motion.div variants={waterFall}>
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Timeline
              </em>
            </h3>
            {differenceInMonths(
              project.timeframe.delivered_at,
              project.timeframe.started_at
            )}{" "}
            months
          </motion.div>
        </motion.div>

        {/* Gallery Images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="w-full min-h-screen rounded-2xl"
          style={{
            backgroundImage: `url(${urlFor(
              project.images.thumbnails[1]
            ).url()})`,
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          variants={waterFall}
        />

        {project.images.gallery.map((img, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
            variants={waterFall}
            key={index}
            className="w-full min-h-screen rounded-2xl"
            style={{
              backgroundImage: `url(${urlFor(img).url()})`,
              backgroundRepeat: "no-repeat",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </motion.div>
      {projects.length > 1 ? (
        <>
          {/* See also */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
            variants={waterFall}
            className="flex flex-col items-center w-full h-full space-y-8 font-instrument"
          >
            <span className="text-[1.5rem] tracking-0 leading-[1.2em] italic">
              See also
            </span>
            <h3>
              <em className="opacity-80 leading-[1.15em] -tracking-[0.02em] text-[4rem]">
                More Projects
              </em>
            </h3>
          </motion.div>

          <ProjectsCarousel
            projects={projects.filter((project) => project._id !== state._id)}
          />
        </>
      ) : null}
    </div>
  );
}

export default Project;
