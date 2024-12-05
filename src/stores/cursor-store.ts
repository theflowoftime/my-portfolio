import { cursorVariants } from "@/lib/framer-variants";
import { create } from "zustand";

export type EventType = keyof typeof cursorVariants;

type State = {
  animateCursorVariant: EventType;
};

type Actions = {
  animateCursor: (eventType: EventType) => void;
};

type CursorStore = State & Actions;

export const useCursorStore = create<CursorStore>((set) => ({
  animateCursorVariant: "cursorEnter", // Default animation variant
  animateCursor: (eventType: EventType) =>
    set({ animateCursorVariant: eventType }),
}));
