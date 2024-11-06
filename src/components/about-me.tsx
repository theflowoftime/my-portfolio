import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

function AboutMe() {
  const { navLinks } = useCachedNavLinks();

  const worksSlug = navLinks?.links?.[1].slug || "about-me";

  return (
    <div className="min-h-screen font-medium text-3xl" id={worksSlug}>
      <div className="relative container">
        <span className="text-purple-400">#</span>
        <span
          className="absolute ml-1 after:content-[''] after:block after:w-[20.38rem] after:h-[1px] 
            after:mx-4 after:bg-purple-400 after:absolute after:top-1/2 after:left-full after:-translate-y-1/2"
        >
          about-me
        </span>
      </div>
    </div>
  );
}

export default AboutMe;
