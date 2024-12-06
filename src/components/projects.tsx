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
import { waterFall } from "@/lib/framer-variants";
import Autoplay from "embla-carousel-autoplay";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { Badge } from "./ui/badge";
import Noise from "./sub-components/bg-noise-and-mask";

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

// export type Project = {
//   _id: string;
//   title: string;
//   isPublic: boolean;
//   summary: string;
//   links: { repo: string; live: string };
//   images: SanityImageSource[];
//   status: "planned" | "on-going"|"delivered"
//   timeframe: {
//   started_at: Date;
//   delivered_at: Date;}
// };

// function ProjectsCarousel() {
//   const language = useLanguageStore((state) => state.language);

//   const [orientation, setOrientation] = useState<Orientation>("horizontal");
//   const plugin = useRef(
//     Autoplay({
//       playOnInit: true,
//       delay: 5000,
//       stopOnMouseEnter: true,
//       stopOnFocusIn: true,
//     })
//   );

//   const { projects, isLoading, error } = useProjects(language);
//   if (isLoading || !projects) return <SectionLayout slug="" />;
//   if (error) return <p>Error fetching projects: {error.message}</p>;

//   const handleClick = () => {
//     setOrientation((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
//   };

//   return (
//     <Carousel
//       // className={`flex m${
//       //   orientation === "horizontal" ? "l" : "t"
//       // }-[calc(var(--slide-spacing) * -1)]`}
//       plugins={[plugin.current]}
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//       opts={{
//         loop: true,
//         align: "center",
//       }}
//       orientation={orientation}
//     >
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//       >
//         <motion.div
//           variants={waterFall} // Define stagger children in the parent
//         >
//           <CarouselContent className="flex w-full h-full">
//             {projects.map((project: Project) => (
//               <CarouselItem
//                 key={project._id}
//                 className="relative flex justify-center w-full overflow-hidden cursor-grab"
//               >
//                 <LazyBackground size="lg" image={project.image} />
//                 <div
//                   className={cn(
//                     "absolute bottom-0 w-full",
//                     orientation === "horizontal"
//                       ? "px-[var(--slide-spacing)]"
//                       : "py-[var(--slide-spacing)]"
//                   )}
//                 >
//                   <div className="flex items-center w-full px-4 py-1 bg-black cursor-default gap-x-4 bg-opacity-40 backdrop-blur-md backdrop-filter">
//                     <span className=" text-white/80 text-effect font-bold text-[3rem]">
//                       {project.title}
//                     </span>
//                     <div className="flex flex-col gap-2 p-0">
//                       {project.link ? (
//                         <CarouselLinkButton
//                           to={project.link}
//                           label="visit live website"
//                           Icon={ExternalLink}
//                           external
//                         />
//                       ) : null}

//                       <CarouselLinkButton
//                         to={`projects/${project._id}`}
//                         label="learn more details"
//                         Icon={LinkIcon}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </motion.div>

//         <motion.div
//           variants={waterFall} // Define stagger children in the parent
//         >
//           {projects.length > 1 ? (
//             <>
//               <CarouselControls projects={projects} />
//               <div className="flex justify-center">
//                 <Button
//                   title={`flip the projects slider ${
//                     orientation === "vertical" ? "horizontal" : "vertical"
//                   }ly`} //localization needed
//                   className="appearance-none bg-transparent hover:text-white dark:hover:text-popover-foreground touch-manipulation inline-flex no-underline cursor-pointer shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] w-[3rem] h-[3rem] z-[1] text-[color:var(--text-body)] items-center justify-center m-0 p-0 border-0"
//                   onClick={handleClick}
//                 >
//                   {orientation === "horizontal" ? (
//                     <GalleryHorizontal />
//                   ) : (
//                     <GalleryVertical />
//                   )}
//                 </Button>
//               </div>
//             </>
//           ) : null}
//         </motion.div>
//       </motion.div>
//     </Carousel>
//   );
// }

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
  if (isLoading || !projects) return <SectionLayout slug={slug} />;
  if (error) return <p>Error fetching projects: {error.message}</p>;

  return (
    <SectionLayout ref={targetRef} slug={slug}>
      {/* <ProjectsCarousel /> */}
      <div
        style={{
          perspective: "1200px",
        }}
        className="relative flex flex-col items-center gap-y-64"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className={`sticky font-unbounded h-[30rem] grid grid-cols-[1fr_2fr_2fr] gap-x-8 dark:bg-zinc-900 bg-stone-300  shadow-md rounded-lg p-2 w-full`}
            style={{
              top: `calc(${index * 50}px + 5rem)`,
              scale: scales[index] ? scales[index] : 1,
              // transform: `perspective(1200px) scale(${
              //   scales[index] ? scales[index] : 1
              // })`,
              willChange: "transform",
              opacity: 1,
            }}
          >
            {/* Badges */}
            <div className="flex h-6 space-x-2">
              <Badge className="font-light" variant="outline">
                JAVASCRIPT
              </Badge>
              <Badge className="font-light" variant="outline">
                REACT
              </Badge>
            </div>

            {/* Project Image */}
            <div>
              <LazyBackground
                className="rounded-lg"
                size="lg"
                image={project.image}
              />
            </div>

            {/* Project Details */}
            <div className="flex flex-col justify-between">
              <p className="flex flex-col text-2xl font-extrabold ">
                <span>Lorem</span>
                <span>dolor amet</span>
              </p>
              <p className="text-sm font-light leading-relaxed text-balance font-fira">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, dolorem iure perspiciatis magni possimus est voluptatem
                hic voluptatum nostrum itaque.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
}

export default Projects;
