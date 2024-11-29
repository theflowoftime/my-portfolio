import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

const useScrollY = () => {
  const { scrollYProgress } = useScroll();
  // const isScrolled = useMotionValue(0);
  const [state, setState] = useState(0);

  useEffect(() => {
    scrollYProgress.on("change", (latest) => {
      setState(latest);
    });

    return () => scrollYProgress.stop();
  }, [scrollYProgress]);

  return state;
};

export default useScrollY;
