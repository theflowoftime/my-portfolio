import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

function AboutMe() {
  const { navLinks } = useCachedNavLinks();

  const worksSlug = navLinks?.links?.[1].slug || "about-me";

  return (
    <div className="min-h-screen" id={worksSlug}>
      About me
    </div>
  );
}

export default AboutMe;
