import { Separator } from "@/components/ui/separator";
import { waterFall } from "@/lib/framer-variants";
import { cn, formatDate } from "@/lib/utils";
import { useLanguageStore } from "@/stores/language-store";
import { AboutMe } from "@/types/types";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Building2, MoveDown } from "lucide-react";

export default function Experiences({
  experiences,
}: {
  experiences?: AboutMe["career"]["experiences"];
}) {
  const language = useLanguageStore((state) => state.language);

  return (
    <motion.div className="flex flex-col w-full gap-y-32 font-unbounded">
      {experiences?.map(
        ({ role, company, timeframe: { start, end } }, index) => (
          <div key={index}>
            <motion.div
              variants={waterFall}
              className={cn(
                "grid items-center justify-center grid-cols-2 grid-rows-2 text-xs sm:gap-y-0 gap-y-6 sm:justify-between sm:grid-cols-3 sm:grid-rows-1",
                language === "AR" && "text-base"
              )}
            >
              <p
                className={cn(
                  "col-span-2 sm:col-span-1",
                  language === "AR" && "order-3"
                )}
              >
                <BriefcaseBusiness
                  size={22}
                  className="w-full text-center stroke-purple-500"
                />
                {role}
              </p>
              <p className={cn(language === "AR" && "order-2")}>
                <Building2
                  size={22}
                  className="w-full text-center stroke-purple-500"
                />
                {company}
              </p>
              <p className={cn(language === "AR" && "order-1")}>
                <span className="opacity-60"> {formatDate(start)} </span>
                <MoveDown
                  size={16}
                  className="w-full text-center stroke-purple-500"
                />
                <span className="opacity-80">
                  {end ? formatDate(end) : "-"}
                </span>
              </p>
            </motion.div>
            <motion.div variants={waterFall}>
              <Separator className="min-w-full dark:bg-white/10 dark:opacity-100 opacity-40 " />
            </motion.div>
          </div>
        )
      )}
    </motion.div>
  );
}
