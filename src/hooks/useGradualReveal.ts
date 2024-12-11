import { useScroll } from "framer-motion";
import { RefObject, useEffect } from "react";

export const useGradualReveal = ({
  setProgression,
  targetRef,
}: {
  setProgression: React.Dispatch<React.SetStateAction<number>>;
  targetRef: RefObject<HTMLParagraphElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [
      [0, 1],
      [1, 1],
    ],
  });

  useEffect(() => {
    let id: number;
    scrollYProgress.on("change", (progress) => {
      id = requestAnimationFrame(() => setProgression(progress));
    });

    return () => {
      scrollYProgress.destroy();
      cancelAnimationFrame(id);
    };
  }, [scrollYProgress]);
};
