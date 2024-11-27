import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

const useScrollY = () => {
  const { scrollYProgress } = useScroll();
  // const isScrolled = useMotionValue(0);
  const [scrollYprogression, setScrollYprogression] = useState(0);

  useEffect(() => {
    scrollYProgress.on("change", (latest) => {
      setScrollYprogression(latest);
    });

    return () => scrollYProgress.stop();
  }, [scrollYProgress]);

  return scrollYprogression;
};

export default useScrollY;
