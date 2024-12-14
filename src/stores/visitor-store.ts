import { VisitorInfoStore } from "@/types/types";
import { create } from "zustand";

export const useVisitorStore = create<VisitorInfoStore>((set) => ({
  visitorInfo: null,
  setVisitorInfo: (info) => set({ visitorInfo: info }),
}));

export default useVisitorStore;
