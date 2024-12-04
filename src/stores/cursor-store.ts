import { create } from "zustand";

export const cursorVariants = {
  cursorEnter: {
    border: "1px solid #eeff00",
    boxShadow: "0 0 1px 0px #eeff00 inset, 0 0 1px 0px #eeff00",
    scale: 2,
    borderRadius: "50%",
    backgroundColor: "transparent",
    transition: {
      duration: 0.2,
    },
  },
  cursorLeave: {
    scale: 0,
    border: 0,
    backgroundColor: "transparent",
    transition: {
      duration: 0.2,
    },
  },
  buttonHover: {
    scale: 1,
    backgroundColor: "#eeff00",
    borderRadius: "50%",
  },
};

type EventType = keyof typeof cursorVariants;

type State = {
  initialCursorVariant: EventType | "";
  animateCursorVariant: EventType | "";
};

type Actions = {
  animateCursor: (eventType: EventType) => void;
};

type CursorStore = State & Actions;

export const useCursorStore = create<CursorStore>((set) => ({
  initialCursorVariant: "", // Default cursor variant on initial load
  animateCursorVariant: "", // Default animation variant
  animateCursor: (eventType: EventType) => {
    set((state) => ({
      initialCursorVariant: state.animateCursorVariant,
      animateCursorVariant: eventType || state.animateCursorVariant, // Update the animated variant based on event
    }));
  },
}));
