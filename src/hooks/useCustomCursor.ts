import { EventType, useCursorStore } from "@/stores/cursor-store";
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

    const handleButtonHover = (eventType: EventType) => () =>
      animateCursor(eventType);

    const handleLinksHover = (eventType: EventType) => () =>
      animateCursor(eventType);

    // Attach body event listeners
    bodyElement.addEventListener("mousemove", updateCursorPosition);
    bodyElement.addEventListener("mouseenter", handleMouseEnter);
    bodyElement.addEventListener("mouseleave", handleMouseLeave);

    // Attach button event listeners
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleButtonHover("buttonHover"));
      button.addEventListener("mouseleave", handleButtonHover("cursorEnter"));
    });

    // Attach link event listeners
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinksHover("buttonHover"));
      link.addEventListener("mouseleave", handleLinksHover("cursorEnter"));
    });
    // Cleanup on unmount
    return () => {
      bodyElement.removeEventListener("mousemove", updateCursorPosition);
      bodyElement.removeEventListener("mouseenter", handleMouseEnter);
      bodyElement.removeEventListener("mouseleave", handleMouseLeave);

      buttons.forEach((button) => {
        button.removeEventListener(
          "mouseenter",
          handleButtonHover("buttonHover")
        );
        button.removeEventListener(
          "mouseleave",
          handleButtonHover("cursorEnter")
        );
      });

      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinksHover("buttonHover"));
        link.removeEventListener("mouseleave", handleLinksHover("cursorEnter"));
      });
    };
  }, [cursorX, cursorY, animateCursor]);

  return { cursorX, cursorY };
};

export default useCustomCursor;
