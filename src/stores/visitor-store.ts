import { create } from "zustand";
interface Info {
  ip: string;
}

type State = {
  visitorInfo: Info | null;
};

type Actions = {
  setVisitorInfo: (info: Info) => void;
};

type VisitorStore = State & Actions;

export const useVisitorStore = create<VisitorStore>((set) => ({
  visitorInfo: null,
  setVisitorInfo: (info) => set({ visitorInfo: info }),
}));

export default useVisitorStore;
