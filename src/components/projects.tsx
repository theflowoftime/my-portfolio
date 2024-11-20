// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import useNavLinks from "@/hooks/useNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import { useLanguageStore } from "@/stores/language-store";
import type { Project } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import projects from "@/assets/data/data.json";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const glowVariants = {
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

function CardItem({
  project,
  containerRef,
  index,
  isSelected,
  handleSelect,
}: {
  project: any;
  containerRef: RefObject<HTMLDivElement>;
  index: number;
  isSelected: boolean;
  handleSelect: (index: number) => void;
}) {
  // Individual card ref
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      className={cn(
        "bg-transparent hover:opacity-100 h-fit w-fit",
        !isSelected ? "z-0" : "z-10 opacity-60 cursor-pointer"
      )}
      onClick={() => handleSelect(index)}
    >
      <CardHeader>
        <CardTitle>Project{project._id}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <motion.div
          className="relative p-1 overflow-hidden bg-center bg-no-repeat bg-contain"
          initial="initial"
          animate={isSelected ? "select" : "initial"}
          custom={{ ref: containerRef, cardRef: cardRef }}
          variants={glowVariants}
          ref={cardRef}
          style={{
            backgroundImage: `url(${project.img_url})`,
          }}
        >
          {/* <span
            className={cn(
              "absolute top-32 left-64",
              !isSelected && "hidden text-4xl text-white",
              isSelected && "opacity-100"
            )}
          >
            xd
          </span> */}
        </motion.div>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}

function Projects() {
  const { data: navLinks } = useNavLinks();
  // const language = useLanguageStore((state) => state.language);
  // const { projects, isLoading, error } = useProjects(language);
  // Find the slug for the "works" section, as the 3rd link
  const slug = navLinks?.links?.[2].slug || "works";

  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedCard, setSelectedCard] = useState<number | null>(0);

  const handleSelect = (index: number) => {
    setSelectedCard((prev) => (prev === index ? null : index)); // Toggle selection
  };

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("slidesChanged", () => {
      console.log("hi");

      setSelectedCard(null);
    });
  }, [api]);

  // if (isLoading)
  //   return (
  //     <SectionLayout slug={slug}>
  //       <Loader2 />
  //     </SectionLayout>
  //   );
  // if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!navLinks) return <p>Loading navigation...</p>;

  return (
    <SectionLayout ref={containerRef} slug={slug}>
      {/* <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem
              key={project._id}
              className="relative md:basis-1/2 lg:basis-1/3"
            >
              <CardItem
                key={project._id}
                project={project}
                index={index}
                isSelected={selectedCard === index}
                handleSelect={handleSelect}
                containerRef={containerRef}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
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
        <CarouselContent className="w-full">
          {projects.map((project: Project, index: number) => (
            <CarouselItem key={index} className="">
              <div
                className="bg-cover text-white bg-center bg-no-repeat shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] text-[4rem] font-semibold flex items-center justify-center h-full select-none rounded-[1.8rem]"
                style={{ backgroundImage: `url(${project.img_url})` }}
              >
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselControls />
      </Carousel>
    </SectionLayout>
  );
}

export default Projects;
