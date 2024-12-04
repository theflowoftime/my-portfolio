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
        className="absolute z-50 w-12 h-12 pointer-events-none"
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
