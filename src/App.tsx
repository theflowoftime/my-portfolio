import { useEffect } from "react";
import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Noise from "./components/sub-components/bg-noise-and-mask";
import useHashNavigation from "./hooks/useHashNavigation";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useCursorStore, cursorVariants } from "./stores/cursor-store";

function App() {
  useHashNavigation();

  const animateCursor = useCursorStore((state) => state.animateCursor);
  const initialCursorVariant = useCursorStore(
    (state) => state.initialCursorVariant
  );
  const animateCursorVariant = useCursorStore(
    (state) => state.animateCursorVariant
  );

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      cursorX.set(e.pageX - 12); // Adjust for cursor size
      cursorY.set(e.pageY - 12);
    };

    const mouseEnterHandler = () => {
      animateCursor("cursorEnter");
    };

    const mouseLeaveHandler = () => {
      animateCursor("cursorLeave");
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseenter", mouseEnterHandler);
    document.addEventListener("mouseleave", mouseLeaveHandler);

    // Optionally add hover listeners for interactive elements like buttons
    // const buttonElements = document.querySelectorAll("button");
    // buttonElements.forEach((btn) => {
    //   btn.addEventListener("mouseenter", () => animateCursor("buttonHover"));
    //   btn.addEventListener("mouseleave", () => animateCursor("cursorLeave"));
    // });

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      // document.removeEventListener("mouseenter", mouseEnterHandler);
      // document.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [cursorX, cursorY, animateCursor]);

  return (
    <div className="relative cursor-none">
      <AnimatePresence>
        <motion.div
          className="w-12 h-12 border-2 rounded-[50%] absolute pointer-events-none border-purple-500 z-50"
          variants={cursorVariants}
          initial={initialCursorVariant} // Initial cursor variant
          animate={animateCursorVariant} // Animated cursor variant
          exit="cursorLeave"
          style={{
            x: cursorX,
            y: cursorY,
            transformOrigin: "center",
          }}
        />
      </AnimatePresence>

      {/* Your components */}
      <Noise />
      <div id="top">
        <Header />
        <Hero />
      </div>
      <main>
        <AboutMe />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
