import SectionLayout from "@/layouts/section-layout";
import Decorations from "./sub-components/about-me/decorations";
import AboutMeImg from "./sub-components/about-me/image";
import Introduction from "./sub-components/about-me/Introduction";
import useNavLinks from "@/hooks/useNavLinks";

function AboutMe() {
  const { data: navLinks } = useNavLinks();
  // const location = useLocation();

  const slug = navLinks?.links?.[1].slug || "about-me";

  return (
    <SectionLayout slug={slug} url="/about-me.jpg">
      <Decorations />
      <div className="relative flex flex-col overflow-hidden">
        <div className="flex flex-col flex-wrap items-center gap-y-4">
          {/* <Introduction /> */}
          {/* <AboutMeImg /> */}
          <div className="flex flex-col items-center space-y-4 text-center font-instrument">
            <h3
              className="text-2xl before:content['']  before:w-16 before:h-[0.05rem] dark:before:bg-white/40 before:bg-black/80 text-purple-400 before:absolute before:top-1/2 before:left-[140%] 
            after:content[''] after:w-16 after:h-[0.05rem] dark:after:bg-white/40 after:bg-black after:absolute after:top-1/2 after:right-[140%] relative w-fit"
            >
              Hello!
            </h3>
            <p className="text-pretty text-[3.25rem] leading-relaxed">
              I help startups and enterprise to establish an emotional
              connection between their products and happy engaged customers
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
