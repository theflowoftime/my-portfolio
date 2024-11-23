import { waterFall } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/stores/language-store";

import { Loader2 } from "lucide-react";
import { useAboutMe } from "@/hooks/useAboutMe";

export default function Introduction() {
  const language = useLanguageStore((state) => state.language);
  const { data, error, isLoading } = useAboutMe(language);

  if (isLoading)
    return (
      // <SectionLayout slug={slug}>
      <Loader2 />
      // </SectionLayout>
    );

  if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!data) return <p>no data found</p>;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      custom={0.2} // Controls delay for paragraph fade-in
      className="space-y-8 w-[32.19rem] leading-[1.8rem] text-[1rem] font-normal tracking-normal self-start"
    >
      {data.homeIntro.map((intro, index) => (
        <motion.p key={index} custom={(index + 1) * 0.2} variants={waterFall}>
          {intro}
        </motion.p>
      ))}
      <motion.div custom={data.homeIntro.length * 0.2} variants={waterFall}>
        <Button
          className="group w-[9.25rem] dark:text-white text-black border-[1px] border-purple-400 rounded-none 
          hover:bg-purple-500/20 hover:transition-all hover:duration-250 bg-transparent"
          type="button"
          asChild
        >
          <Link to="/about-me">
            {data.button.value}
            <span className="text-purple-400 dark:group-hover:text-purple-400 group-hover:animate-pulse group-hover:text-black">
              {"->"}
            </span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
