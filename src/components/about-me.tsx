import { useAboutMe } from "@/hooks/useAboutMe";
import SectionLayout from "@/layouts/section-layout";
import { waterFall } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import Keywords from "./sub-components/about-me/keywords";
import Experiences from "./sub-components/about-me/experiences";
import Introduction from "./sub-components/about-me/introduction";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import AnimatedButton from "./sub-components/animated-button";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/stores/language-store";

function AboutMe() {
  const { navLinks } = useCachedNavLinks();

  const { isLoading, data: aboutMeData } = useAboutMe();
  const slug = navLinks?.links?.[1].slug || "about-me";
  const language = useLanguageStore((state) => state.language);

  const words = aboutMeData?.introduction?.whatIdo?.split(" ") || [];

  if (isLoading) return <SectionLayout slug={slug} />;

  return (
    <SectionLayout slug={slug}>
      <div className="flex flex-col items-center justify-center gap-y-32">
        <div className="relative flex flex-col items-center justify-center gap-y-8">
          <div className="flex flex-col flex-wrap items-center gap-y-4">
            <div
              className={cn(
                "flex flex-col items-center gap-y-4 font-instrument place-content-center h-min max-w-full",
                language === "AR" && "font-baloo"
              )}
              style={{
                perspective: 1200,
              }}
            >
              <div
                className={cn(
                  "text-2xl font-instrument text-purple-400 relative w-full flex items-center justify-center gap-x-8"
                )}
              >
                <div className="overflow-hidden h-[1px] relative w-[4.5rem] opacity-50  bg-left" />
                <h3 className="">{aboutMeData?.introduction?.title}</h3>
                <div className="overflow-hidden h-[1px] relative w-[4.5rem] opacity-50  bg-right" />
              </div>
              <Introduction words={words} />
            </div>
          </div>
          <Keywords keywords={aboutMeData?.introduction?.keywords} />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={waterFall} // Define stagger children in the parent
          className="flex flex-col items-center w-full space-y-16 text-center"
        >
          <div
            className={cn(
              "text-2xl font-instrument text-purple-400 relative w-full flex items-center justify-center gap-x-8",
              language === "AR" && "font-baloo"
            )}
          >
            <div className="overflow-hidden h-[1px] relative w-[4.5rem] opacity-50 bg-left" />
            <h3 className="">{aboutMeData?.career?.title}</h3>
            <div className="overflow-hidden h-[1px] relative w-[4.5rem] opacity-50 bg-right" />
          </div>

          <Experiences experiences={aboutMeData?.career?.experiences} />
        </motion.div>
        <motion.div
          className="w-full"
          viewport={{ once: true, amount: "all" }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.6, delay: 0.2 }}
        >
          <AnimatedButton textContent="download resume" />
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
