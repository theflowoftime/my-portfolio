import { useRef } from "react";
import useHero from "@/hooks/useHero";
import { Loader2 } from "lucide-react";
import { type Hero } from "@/types/types";
import { LeftSide } from "./sub-components/hero/left-side";
import RightSide from "./sub-components/hero/right-side";
import Quotes from "./sub-components/hero/bottom";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

function Rectangle() {
  return (
    <div
      className="md:block hidden absolute bottom-20 right-0 shadow-sm shadow-black 
     h-[5.69rem] w-[5.69rem] bg-clip-padding bg-opacity-10"
    />
  );
}

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const { navLinks } = useCachedNavLinks();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) return;
  <div className="relative flex flex-col">
    <Loader2 />
  </div>;

  return (
    <div className="relative flex flex-col">
      <Rectangle />
      <div className="container flex flex-col items-center mt-4 gap-x-2 lg:flex-row lg:gap-y-4">
        <LeftSide heroData={heroData} navLinks={navLinks} />
        <RightSide heroData={heroData} />
      </div>
      <Quotes heroData={heroData} scrollRef={scrollRef} />
    </div>
  );
}

export default Hero;
