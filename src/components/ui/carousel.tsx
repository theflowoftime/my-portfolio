import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

import { cn, formatDate, urlFor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Orientation, Project } from "@/types/types";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: Orientation;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollTo: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [selectedIndex, setSelectedIndex] = React.useState(
      api?.selectedScrollSnap() || 0
    );
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>(
      api?.scrollSnapList() || []
    );

    const onInit = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollTo = React.useCallback(
      (index: number) => {
        if (!api) return;
        api.scrollTo(index); // Scroll to the exact index
      },
      [api]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (orientation as Orientation) {
          case "horizontal":
            event.preventDefault();
            if (event.key === "ArrowLeft") {
              scrollTo(
                selectedIndex - 1 < 0
                  ? scrollSnaps.length - 1
                  : selectedIndex - 1
              );
            } else if (event.key === "ArrowRight") {
              scrollTo(
                selectedIndex + 1 > scrollSnaps.length - 1
                  ? 0
                  : selectedIndex + 1
              );
            }
            break;

          case "vertical":
            event.preventDefault();
            if (event.key === "ArrowUp") {
              scrollTo(
                selectedIndex - 1 < 0
                  ? scrollSnaps.length - 1
                  : selectedIndex - 1
              );
            } else if (event.key === "ArrowDown") {
              scrollTo(
                selectedIndex + 1 > scrollSnaps.length - 1
                  ? 0
                  : selectedIndex + 1
              );
            }
            break;

          default:
            break;
        }
      },
      [orientation, scrollTo, selectedIndex, scrollSnaps.length]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      // First, initialize state.
      onInit(api);
      onSelect(api);

      // Then, register event listeners.
      api.on("init", onInit);
      api.on("reInit", onInit);
      api.on("select", onSelect);

      return () => {
        // Cleanup on unmount or dependency changes.
        api.off("init", onInit);
        api.off("reInit", onInit);
        api.off("select", onSelect);
      };
    }, [api, onInit, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollSnaps,
          selectedIndex,
          scrollTo,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn(
        "overflow-hidden flex h-[calc(var(--slide-spacing)_+_var(--slide-height))] ",
        orientation === "vertical" && "flex-col"
      )}
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-h-0 flex-[0_0_var(--slide-size)]",
        orientation === "horizontal"
          ? "px-[var(--slide-spacing)]"
          : "py-[var(--slide-spacing)]",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, selectedIndex, scrollTo, scrollSnaps } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] w-[3.6rem] h-[3.6rem] z-[1] text-[color:var(--text-body)] items-center justify-center m-0 p-0 rounded-[50%] border-0",
        orientation === "horizontal" ? " " : "transform rotate-90",

        className
      )}
      onClick={() =>
        scrollTo(
          selectedIndex - 1 < 0 ? scrollSnaps.length - 1 : selectedIndex - 1
        )
      }
      {...props}
    >
      <ArrowLeft className="w-[35%] h-[35%]" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollSnaps, scrollTo, selectedIndex } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "appearance-none bg-transparent touch-manipulation no-underline cursor-pointer shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] w-[3.6rem] h-[3.6rem] z-[1] text-[color:var(--text-body)] flex items-center justify-center m-0 p-0 rounded-[50%] border-0",
        orientation === "horizontal" ? "" : "rotate-90",
        className
      )}
      onClick={() =>
        scrollTo(
          selectedIndex + 1 > scrollSnaps.length - 1 ? 0 : selectedIndex + 1
        )
      }
      {...props}
    >
      <ArrowRight className="w-[35%] h-[35%]" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

const DotButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ children, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        "w-3 h-3 mx-1 rounded-full bg-gray-400 hover:bg-gray-600 focus:bg-gray-700 focus:ring focus:ring-offset-1 transition-all duration-200",
        className
      )}
    >
      {children}
    </Button>
  );
});

const DotButtons = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { projects: Project[] }
>(({ projects, ...props }, ref) => {
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-end items-center mr-[calc((2.6rem_-_1.4rem)_/_2_*_-1)]"
      {...props}
    >
      {projects.map((project, index) => (
        <HoverCard key={project._id}>
          <HoverCardTrigger asChild>
            <DotButton
              onClick={() => scrollTo(index)}
              className={cn(
                "appearance-none bg-transparent touch-manipulation no-underline cursor-pointer w-[2.6rem] h-[2.6rem] flex items-center justify-center m-0 p-0 rounded-[50%] border-0 after:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] after:w-[1.4rem] after:h-[1.4rem] after:flex after:items-center after:content-[''] after:rounded-[50%]",
                index === selectedIndex
                  ? "after:shadow-[inset_0_0_0_0.2rem_var(--text-body)]"
                  : ""
              )}
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={urlFor(project.image).url()} />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{project.title}</h4>
                <p className="text-xs">{project.description}</p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="w-4 h-4 mr-2 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Started: {formatDate(project.started_at)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Delivered: {formatDate(project.delivered_at)}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
});

const CarouselControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { projects: Project[] }
>(({ className, projects, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-[auto_2fr]  justify-between gap-[1.2rem] mt-[1.8rem]",
        className
      )}
      {...props}
    >
      {/* Arrow Buttons */}
      <div className="grid grid-cols-[auto_2fr] gap-[0.6rem] items-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>

      {/* Dots */}
      <DotButtons projects={projects} />
    </div>
  );
});

CarouselControls.displayName = "CarouselControls";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselControls,
};
