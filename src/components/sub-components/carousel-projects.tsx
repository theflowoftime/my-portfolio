// import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import type { Orientation, Project, Projects } from "@/types/types";
import {
  ExternalLink,
  GalleryHorizontal,
  GalleryVertical,
  LinkIcon,
  LucideIcon,
} from "lucide-react";

// import projects from "@/assets/data/data.json";
import { waterFall } from "@/lib/framer-variants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "../ui/carousel";
import LazyBackground from "./lazy-bg-img-sanity";

export function CarouselLinkButton({
  to,
  label,
  Icon,
  external = false,
}: {
  to: string;
  label: string;
  Icon: LucideIcon;
  external?: boolean;
}) {
  return (
    <Link
      to={to}
      target={external ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="flex items-center gap-x-2"
      aria-label={label}
    >
      <Icon className="text-white peer hover:stroke-purple-400" size={20} />
      <span className="hidden text-xs font-unbounded text-purple-400/80 peer-hover:inline">
        {label}
      </span>
    </Link>
  );
}

export default function ProjectsCarousel({ projects }: { projects: Projects }) {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const plugin = useRef(
    Autoplay({
      playOnInit: true,
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const handleClick = () => {
    setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  return (
    <Carousel
      // className={`flex m${
      //   orientation === "horizontal" ? "l" : "t"
      // }-[calc(var(--slide-spacing) * -1)]`}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        align: "center",
      }}
      orientation={orientation}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          variants={waterFall} // Define stagger children in the parent
        >
          <CarouselContent className="flex w-full h-full">
            {projects.map((project: Project) => (
              <CarouselItem
                key={project._id}
                className="relative flex justify-center w-full overflow-hidden cursor-grab"
              >
                <LazyBackground
                  size="lg"
                  image={project.image}
                  className="w-full bg-no-repeat bg-contain sm:bg-cover"
                />
                <div
                  className={cn(
                    "absolute bottom-0 w-full",
                    orientation === "horizontal"
                      ? "px-[var(--slide-spacing)]"
                      : "py-[var(--slide-spacing)]"
                  )}
                >
                  <div className="flex items-center w-full px-4 py-1 bg-black cursor-default gap-x-4 bg-opacity-40 backdrop-blur-md backdrop-filter">
                    <span className=" text-white/80 text-effect font-bold text-[3rem]">
                      {project.title}
                    </span>
                    <div className="flex flex-col gap-2 p-0">
                      {project.link ? (
                        <CarouselLinkButton
                          to={project.link}
                          label="visit live website"
                          Icon={ExternalLink}
                          external
                        />
                      ) : null}

                      <CarouselLinkButton
                        to={`/projects/${project._id}`}
                        label="learn more details"
                        Icon={LinkIcon}
                      />
                    </div>
                  </div>
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
  );
}
