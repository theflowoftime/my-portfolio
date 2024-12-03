import { Badge } from "@/components/ui/badge";
import { useTime, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const Keywords = ({ keywords }: { keywords?: string[] }) => {
  const time = useTime();
  const y = useTransform(() => Math.sin(time.get() / 1000) * 10);
  const constraintRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={constraintRef}
      className="h-[15rem] max-w-max grid grid-cols-2 justify-between items-center gap-y-4 gap-x-24 cursor-grab"
      style={{
        perspective: "1400px", // Ensures perspective for 3D effect
      }}
    >
      {keywords?.map((keyword, index) => (
        <motion.div
          style={{ y }}
          key={keyword}
          drag
          dragConstraints={constraintRef}
          initial={{
            opacity: 0,
            x: 50 * ((index + 1) % 2 ? 1 : -1),
            rotateY: `${60 * ((index + 1) % 2 ? 1 : -1)}deg`,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 10,
            },
          }}
          viewport={{ once: true }}
          whileDrag={{
            rotateY: 0,
            transition: {
              type: "spring",
              stiffness: 10,
            },
          }}
          className="cursor-grab w-fit h-fit"
        >
          <Badge
            className="px-6 py-3 italic shadow-md select-none font-unbounded dark:shadow-white shadow-black"
            variant="outline"
          >
            {keyword}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Keywords;
