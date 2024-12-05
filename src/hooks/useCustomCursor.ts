import { useCursorStore } from "@/stores/cursor-store";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

const useCustomCursor = () => {
  const animateCursor = useCursorStore((state) => state.animateCursor);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const bodyElement = document.body;
    const offset = 12; // Offset for cursor size adjustment

    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - offset);
      cursorY.set(e.clientY - bodyElement.scrollTop - offset);
    };

    const handleMouseEnter = () => animateCursor("cursorEnter");
    const handleMouseLeave = () => animateCursor("cursorLeave");

    // Attach body event listeners
    bodyElement.addEventListener("mousemove", updateCursorPosition);
    bodyElement.addEventListener("mouseenter", handleMouseEnter);
    bodyElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup on unmount
    return () => {
      bodyElement.removeEventListener("mousemove", updateCursorPosition);
      bodyElement.removeEventListener("mouseenter", handleMouseEnter);
      bodyElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, animateCursor]);

  return { cursorX, cursorY };
};

export default useCustomCursor;
