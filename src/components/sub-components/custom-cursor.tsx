import useCustomCursor from "@/hooks/useCustomCursor";
import { cursorVariants } from "@/lib/framer-variants";
import { useCursorStore } from "@/stores/cursor-store";
import { AnimatePresence, motion } from "framer-motion";

export default function Cursor() {
  const { cursorX, cursorY } = useCustomCursor();

  const animateCursorVariant = useCursorStore(
    (state) => state.animateCursorVariant
  );
  return (
    <AnimatePresence>
      <motion.div
        id="cursor"
        className="fixed z-50 w-8 h-8 pointer-events-none mix-blend-hard-light"
        variants={cursorVariants}
        animate={animateCursorVariant} // Animated cursor variant
        exit="cursorLeave"
        style={{
          x: cursorX,
          y: cursorY,
          transformOrigin: "center",
        }}
      />
    </AnimatePresence>
  );
}
