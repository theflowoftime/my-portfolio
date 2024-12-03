import { Separator } from "@/components/ui/separator";
import { waterFall } from "@/lib/framer-variants";
import { AboutMe } from "@/types/types";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CalendarFold,
  MoveRight,
} from "lucide-react";

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
              className="grid justify-between grid-cols-3 justify-items-center"
            >
              <p>
                <BriefcaseBusiness className="w-full text-center" />
                {role}
              </p>
              <p className="text-2xl text-effect">
                <Building2 className="w-full text-center" />
                {company}
              </p>
              <p className="opacity-60">
                <CalendarFold className="w-full text-center" />
                {new Date(start).getFullYear()}{" "}
                <MoveRight size={16} className="inline-block" />{" "}
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
