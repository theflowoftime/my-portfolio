// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { useLanguageStore } from "@/stores/language-store";
import type { Orientation, Project } from "@/types/types";
import {
  ExternalLink,
  GalleryHorizontal,
  GalleryVertical,
  LinkIcon,
  LucideIcon,
} from "lucide-react";

// import projects from "@/assets/data/data.json";
import useNavLinks from "@/hooks/useNavLinks";
import { waterFall } from "@/lib/framer-variants";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "./ui/carousel";
import { Link } from "react-router-dom";

function CarouselLinkButton({
  to,
  label,
  Icon,
}: {
  to: string;
  label: string;
  Icon: LucideIcon;
}) {
  return (
    <Link
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 group"
      aria-label={label}
    >
      <span className="px-4 py-2 text-white transition-all duration-300 ease-in translate-x-full bg-black rounded-full opacity-0 bg-opacity-5 backdrop-blur-md backdrop-filter group-hover:translate-x-0 group-hover:opacity-100">
        {label}
      </span>
      <Icon className="stroke-white group-hover:stroke-purple-500 " size={28} />
    </Link>
  );
}

function Projects() {
  const { data: navLinks } = useNavLinks();

  const slug = navLinks?.links?.[2].slug || "works";

  const language = useLanguageStore((state) => state.language);
  const { projects, isLoading, error } = useProjects(language);

  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const plugin = useRef(
    Autoplay({
      playOnInit: true,
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  if (isLoading || !projects)
    return <SectionLayout slug={slug}></SectionLayout>;
  if (error) return <p>Error fetching projects: {error.message}</p>;

  const handleClick = () => {
    setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  return (
    <SectionLayout slug={slug} url="/projects.jpg">
      <Carousel
        // className={`flex m${
        //   orientation === "horizontal" ? "l" : "t"
        // }-[calc(var(--slide-spacing) * -1)]`}
        opts={{
          loop: true,
          align: "center",
        }}
        orientation={orientation}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div
            variants={waterFall} // Define stagger children in the parent
          >
            <CarouselContent className="flex w-full h-full">
              {projects.map((project: Project) => (
                <CarouselItem
                  key={project._id}
                  className="relative cursor-grab"
                >
                  <LazyBackground image={project.image} title={project.title} />
                  <div className="absolute top-0 right-0 flex flex-col items-end gap-2 p-2">
                    <CarouselLinkButton
                      to={project.link}
                      label="Live Website"
                      Icon={ExternalLink}
                    />
                    <CarouselLinkButton
                      to={project.link}
                      label="Project Page"
                      Icon={LinkIcon}
                    />

                    {/* <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 group"
                      aria-label="Visit Live Website"
                    >
                      <span className="transition-all duration-300 ease-in translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                        Live Website
                      </span>
                      <ExternalLink
                        className="stroke-white group-hover:stroke-purple-500 "
                        size={28}
                      />
                    </Link> */}
                    {/* <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 group"
                      aria-label="Visit Project Page"
                    >
                      <span className="transition-all duration-300 ease-in translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                        Project Page
                      </span>
                      <LinkIcon
                        className="stroke-white group-hover:stroke-purple-500"
                        size={28}
                      />
                    </Link> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>

          <motion.div
            variants={waterFall} // Define stagger children in the parent
          >
            {projects.length > 1 ? (
              <>
                <CarouselControls projects={projects} />
                <div className="flex justify-center">
                  <Button
                    title={`flip the projects slider ${
                      orientation === "vertical" ? "horizontal" : "vertical"
                    }ly`} //localization needed
                    className="appearance-none bg-transparent hover:text-white dark:hover:text-popover-foreground touch-manipulation inline-flex no-underline cursor-pointer shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] w-[3rem] h-[3rem] z-[1] text-[color:var(--text-body)] items-center justify-center m-0 p-0 border-0"
                    onClick={handleClick}
                  >
                    {orientation === "horizontal" ? (
                      <GalleryHorizontal />
                    ) : (
                      <GalleryVertical />
                    )}
                  </Button>
                </div>
              </>
            ) : null}
          </motion.div>
        </motion.div>
      </Carousel>
    </SectionLayout>
  );
}

export default Projects;
