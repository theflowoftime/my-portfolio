import ProjectsCarousel from "@/components/sub-components/carousel-projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProject";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Projects } from "@/types/types";
import { Link } from "lucide-react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

const tags = ["Branding", "Web"];
const services = [
  "Product Design",
  "Strategy Branding",
  "No-Code",
  "Development",
];
const stacks = ["Framer", "Figma", "Adobe CC"];
const timeline = "4 weeks";

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
    <div className="space-y-16">
      {/* might add a breadcrumb /all projects/project-1 */}
      <div className="flex flex-col gap-y-16 ">
        {/* Info Showcase */}
        <div className="flex flex-col gap-y-4 w-[46%] h-[calc(100vh_-_4.56rem)] justify-center pt-8 -tracking-[0.02em]">
          <h1 className="text-[5.35rem] font-instrument ">Remix Supply</h1>
          <div className="flex font-mono gap-x-4">
            {tags.map((tag) => (
              <Badge
                variant="outline"
                className="text-[1.05rem] font-light px-3"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <strong className="font-mono text-[1.3rem] leading-relaxed text-balance opacity-80">
            A personal project with a mission to help designers and makers to
            showcase their skills and do is as fast as possible.
          </strong>
          <Button
            className="px-5 py-6 text-white bg-black rounded-full w-fit"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.008) 0.565274px 0.565274px 1.75872px 0px, rgba(0, 0, 0, 0.02) 1.44525px 1.44525px 4.49656px 0px, rgba(0, 0, 0, 0.042) 2.89741px 2.89741px 9.01462px 0px, rgba(0, 0, 0, 0.08) 5.49248px 5.49248px 17.0886px 0px, rgba(0, 0, 0, 0.16) 10.9174px 10.9174px 33.967px 0px, rgba(0, 0, 0, 0.35) 24px 24px 74.6705px 0px, rgb(0, 0, 0) 0px -16px 48px 0px inset",
            }}
          >
            Live Link
            <Link />
          </Button>
        </div>

        {/* Image 1 */}
        <div
          className="w-full min-h-screen rounded-2xl"
          style={{
            backgroundImage: "url('/project1/project-1.avif')",
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* stack */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Services
              </em>
            </h3>
            {services.map((service, index) => (
              <div>
                {service}
                {services.length - 1 !== index ? "," : ""}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Stack
              </em>
            </h3>
            {stacks.map((stack, index) => (
              <span>
                {stack}
                {stacks.length - 1 !== index ? ", " : ""}
                {stacks.length - 2 === index ? <br /> : ""}
              </span>
            ))}
          </div>

          <div>
            <h3 className="font-instrument">
              <em className="opacity-80 leading-[1.2em] text-[1.5rem]">
                Timeline
              </em>
            </h3>
            {timeline}
          </div>
        </div>

        {[2, 3, 4, 5].map((i) => (
          <div
            className="w-full min-h-screen rounded-2xl"
            style={{
              backgroundImage: `url('/project1/project-${i}.avif')`,
              backgroundRepeat: "no-repeat",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* See also */}
      <div className="flex flex-col items-center w-full h-full space-y-8 font-instrument">
        <span className="text-[1.5rem] tracking-0 leading-[1.2em] italic">
          See also
        </span>
        <h3>
          <em className="opacity-80 leading-[1.15em] -tracking-[0.02em] text-[4rem]">
            More Projects
          </em>
        </h3>

        {/* <div className="grid w-full grid-cols-2 gap-x-8">
          <div className="bg-white h-96 rounded-2xl">1</div>
          <div className="bg-white h-96 rounded-2xl">2</div>
        </div> */}
      </div>
      <ProjectsCarousel
        projects={projects.filter((project) => project._id !== state._id)}
      />
    </div>
  );
}

export default Project;
