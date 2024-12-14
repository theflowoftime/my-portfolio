import { decryptData } from "@/lib/utils";
import { VisitorInfoStore } from "@/types/types";
import { create } from "zustand";

export const useVisitorStore = create<VisitorInfoStore>((set) => ({
  visitorInfo: null,
  setVisitorInfo: (info) => set({ visitorInfo: decryptData(info) }),
}));

export default useVisitorStore;
