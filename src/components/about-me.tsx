import { useAboutMe } from "@/hooks/useAboutMe";
import useNavLinks from "@/hooks/useNavLinks";
import SectionLayout from "@/layouts/section-layout";
import { waterFall } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import Keywords from "./sub-components/about-me/keywords";
import Experiences from "./sub-components/about-me/experiences";
import Introduction from "./sub-components/about-me/introduction";

function AboutMe() {
  const { data: navLinks } = useNavLinks();
  const { isLoading, data: aboutMeData } = useAboutMe();
  const slug = navLinks?.links?.[1].slug || "about-me";

  const words = aboutMeData?.introduction?.whatIdo?.split(" ") || [];

  if (isLoading) return <SectionLayout slug={slug} url="/about-me.jpg" />;

  return (
    <SectionLayout slug={slug} url="/about-me.jpg">
      <div className="flex flex-col items-center justify-center gap-y-16">
        <div className="relative flex flex-col items-center justify-center gap-y-8">
          <div className="flex flex-col flex-wrap items-center gap-y-4">
            <div className="flex flex-col items-center space-y-4 text-center font-instrument">
              <h3
                className="text-2xl font-instrument before:content[''] before:w-16 before:h-[0.062rem] dark:before:bg-white/10 
          before:bg-purple-700/30 text-purple-400 before:absolute before:-translate-y-1/2 after:-translate-y-1/2 before:top-1/2 before:left-[36%] 
          after:content[''] after:w-16 after:h-[0.062rem]  dark:after:bg-white/10  after:bg-purple-700/30 after:absolute after:top-1/2 after:right-[36%] relative w-full"
              >
                {aboutMeData?.introduction?.title}
              </h3>
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
          <h3
            className="text-2xl font-instrument before:content[''] before:w-16 before:h-[0.062rem] dark:before:bg-white/10 
            before:bg-purple-700/30 text-purple-400 before:absolute before:-translate-y-1/2 after:-translate-y-1/2 before:top-1/2 before:left-[36%] 
            after:content[''] after:w-16 after:h-[0.062rem] dark:after:bg-white/10 after:bg-purple-700/30 after:absolute after:top-1/2 after:right-[36%] relative w-full"
          >
            {aboutMeData?.career.title}
          </h3>
          <Experiences experiences={aboutMeData?.career?.experiences} />
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default AboutMe;
