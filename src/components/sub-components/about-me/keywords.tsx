import { Badge } from "@/components/ui/badge";
import { useTime, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const Keywords = ({ keywords }: { keywords?: string[] }) => {
  const time = useTime();
  const z = useTransform(() => Math.sin(time.get() / 1000) * -50);

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
          style={{ z }}
          key={keyword}
          drag
          dragConstraints={constraintRef}
          initial={{
            opacity: 0,
            x: 60 * ((index + 1) % 2 ? 1 : -1),
            rotateY: `${45 * ((index + 1) % 2 ? 1 : -1)}deg`,
            zIndex: 0,
          }}
          whileInView={{
            opacity: 1,
            x: [50, 0, -50, 0], // random replace with some pattern
            transition: { type: "spring", stiffness: 10 },
          }}
          viewport={{ once: true }}
          whileDrag={{
            opacity: 1,
            z: 0,
            rotateY: 0,
            zIndex: 10,
            transition: {
              type: "spring",
              damping: 5,
              stiffness: 200,
            },
          }}
          className="cursor-grab w-fit h-fit"
        >
          <Badge
            className="px-6 py-3 bg-black shadow-sm select-none font-unbounded dark:shadow-white shadow-black backdrop-blur-sm backdrop-filter dark:bg-opacity-5 dark:bg-white bg-opacity-5"
            variant="outline"
          >
            <span className="text-xs font-light">{keyword}</span>
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Keywords;
