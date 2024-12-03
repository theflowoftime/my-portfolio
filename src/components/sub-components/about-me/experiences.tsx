import { Separator } from "@/components/ui/separator";
import { waterFall } from "@/lib/framer-variants";
import { AboutMe } from "@/types/types";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Building2, CalendarFold } from "lucide-react";

export default function Experiences({
  experiences,
}: {
  experiences?: AboutMe["career"]["experiences"];
}) {
  return (
    <motion.div className="flex flex-col w-full gap-y-32 font-unbounded">
      {experiences?.map(
        ({ role, company, timeframe: { start, end } }, index) => (
          <div key={index}>
            <motion.div
              variants={waterFall}
              className="grid items-center justify-between grid-cols-3 "
            >
              <p className="text-xs">
                <BriefcaseBusiness
                  size={22}
                  className="w-full text-center stroke-purple-500"
                />
                {role}
              </p>
              <p className="text-sm">
                <Building2
                  size={22}
                  className="w-full text-center stroke-purple-500"
                />
                {company}
              </p>
              <p className="text-xs">
                {new Date(start).getFullYear()}{" "}
                <CalendarFold
                  size={22}
                  className="w-full text-center stroke-purple-500"
                />
                {end ? new Date(end).getFullYear() : "-"}
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
