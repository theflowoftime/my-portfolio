import SectionLayout from "@/layouts/section-layout";
import Decorations from "./sub-components/about-me/decorations";
import AboutMeImg from "./sub-components/about-me/image";
import Introduction from "./sub-components/about-me/Introdcution";
import useNavLinks from "@/hooks/useNavLinks";

function AboutMe() {
  const { data: navLinks } = useNavLinks();
  // const location = useLocation();

  const slug = navLinks?.links?.[1].slug || "about-me";

  return (
    <SectionLayout slug={slug}>
      <Decorations />
      <div className="relative flex flex-col overflow-hidden gap-y-4">
        <div className="flex flex-col flex-wrap items-center justify-between lg:flex-row gap-y-8">
          <Introduction />
          <AboutMeImg />
        </div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
