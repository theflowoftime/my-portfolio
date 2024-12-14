import { create } from "zustand";
interface Info {
  ip: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
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
