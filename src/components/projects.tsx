// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import useNavLinks from "@/hooks/useNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { useLanguageStore } from "@/stores/language-store";
import type { Project } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// import projects from "@/assets/data/data.json";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "./ui/carousel";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { urlFor } from "@/lib/utils";

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
  const language = useLanguageStore((state) => state.language);
  const { projects, isLoading, error } = useProjects(language);
  // Find the slug for the "works" section, as the 3rd link
  const slug = navLinks?.links?.[2].slug || "works";

  if (isLoading)
    return (
      <SectionLayout slug={slug}>
        <Loader2 />
      </SectionLayout>
    );
  if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!navLinks) return <p>Loading navigation...</p>;

  if (!projects) return <p>Loading projects...</p>;

  return (
    <SectionLayout slug={slug}>
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        orientation="vertical"
        //   plugins={[plugin.current]}
        //   onMouseEnter={plugin.current.stop}
        //   onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full h-full">
          {projects.map((project: Project) => (
            <CarouselItem key={project._id} className="">
              <div
                className="bg-cover text-white bg-center bg-no-repeat shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] text-[4rem] font-semibold flex items-center justify-center h-full select-none rounded-[1.8rem]"
                style={{
                  backgroundImage: `url(${urlFor(project.image).url()})`,
                }}
              >
                {project.title}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {projects && projects.length > 1 ? (
          <CarouselControls projects={projects} />
        ) : null}
      </Carousel>
    </SectionLayout>
  );
}

export default Projects;
