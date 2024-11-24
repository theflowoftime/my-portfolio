// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { useLanguageStore } from "@/stores/language-store";
import type { Orientation, Project } from "@/types/types";
import { Loader2, MoveHorizontal, MoveVertical } from "lucide-react";
import { useLocation } from "react-router-dom";

// import projects from "@/assets/data/data.json";
import { type Variants } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "./ui/carousel";
import useNavLinks from "@/hooks/useNavLinks";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";

const variants: Variants = {
  initial: () => ({
    x: 0,
    y: 0,
    width: 250, // Initial card size
    height: 250,
  }),
  select: ({
    ref,
    cardRef,
  }: {
    ref: RefObject<HTMLDivElement>;
    cardRef: RefObject<HTMLDivElement>;
  }) => {
    const containerRect = ref.current?.getBoundingClientRect();
    const cardRect = cardRef.current?.getBoundingClientRect();

    if (!containerRect || !cardRect) return {};

    return {
      x: containerRect.left - cardRect.left,
      y: containerRect.top - cardRect.top,
      width: containerRect.width,
      height: containerRect.height,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    };
  },
};

function Projects() {
  const { data: navLinks } = useNavLinks();
  // const {
  //   state: { data: navLinks },
  // } = useLocation();

  // const location = useLocation();
  // const navLinks = location?.state?.data;
  const slug = navLinks?.links?.[2].slug || "works";

  const language = useLanguageStore((state) => state.language);
  const { projects, isLoading, error } = useProjects(language);

  const [orientation, setOrientation] = useState<Orientation>("vertical");
  // Find the slug for the "works" section, as the 3rd link
  const plugin = useRef(Autoplay({ playOnInit: true, delay: 5000 }));

  // if (isLoading)
  //   return (
  //     <SectionLayout slug={slug}>
  //       <Loader2 />
  //     </SectionLayout>
  //   );
  if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!navLinks) return <p>Loading navigation...</p>;

  if (!projects) return <p>Loading projects...</p>;

  const handleClick = () => {
    setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  return (
    <SectionLayout slug={slug}>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        orientation={orientation}
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full h-full">
          {projects.map((project: Project) => (
            <CarouselItem key={project._id} className="">
              {/* <div
                className="bg-cover text-white bg-center bg-no-repeat shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] text-[4rem] font-semibold flex items-center justify-center h-full select-none rounded-[1.8rem]"
                style={{
                  backgroundImage: `url(${urlFor(project.image).url()})`,
                }}
              >
                {project.title}
              </div> */}

              <LazyBackground image={project.image} title={project.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {projects.length > 1 ? (
          <>
            <CarouselControls projects={projects} />
            <div className="flex justify-center">
              <Button
                title={`flip the projects slider ${
                  orientation === "vertical" ? "horizontal" : "vertical"
                }ly`} //localization needed
                className="appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] w-[3rem] h-[3rem] z-[1] text-[color:var(--text-body)] items-center justify-center m-0 p-0 rounded-[50%] border-0"
                onClick={handleClick}
              >
                {orientation === "horizontal" ? (
                  <MoveVertical />
                ) : (
                  <MoveHorizontal />
                )}
              </Button>
            </div>
          </>
        ) : null}
      </Carousel>
    </SectionLayout>
  );
}

export default Projects;
