import { useCursorStore } from "@/stores/cursor-store";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

const useCustomCursor = () => {
  const animateCursor = useCursorStore((state) => state.animateCursor);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const bodyElement = document.body;

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12); // can Adjust for cursor size
      cursorY.set(e.clientY - bodyElement.scrollTop - 12);
    };

    const mouseEnterHandler = () => {
      animateCursor("cursorEnter");
    };

    const mouseLeaveHandler = () => {
      animateCursor("cursorLeave");
    };

    bodyElement.addEventListener("mousemove", mouseMoveHandler);
    bodyElement.addEventListener("mouseenter", mouseEnterHandler);
    bodyElement.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      bodyElement.removeEventListener("mousemove", mouseMoveHandler);
      bodyElement.removeEventListener("mouseenter", mouseEnterHandler);
      bodyElement.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [cursorX, cursorY, animateCursor]);

  return { cursorX, cursorY };
};

export default useCustomCursor;
