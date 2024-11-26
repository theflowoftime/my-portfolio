import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

const useScrollY = () => {
  const { scrollYProgress } = useScroll();
  // const isScrolled = useMotionValue(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      setIsScrolled(latest > 0);
    });

    return () => unsub();
  }, [scrollYProgress]);

  return isScrolled;
};

export default useScrollY;
