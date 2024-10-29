import { ScrollStore } from "@/types/types";
import { create } from "zustand";
const useScrollStore = create<ScrollStore>((set, get) => ({
  hash: "",
  setHash: (newHash: string) => set({ hash: newHash }),
  scrollToHash: () => {
    const { hash } = get();
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    if (hash === "#top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  },
}));

export default useScrollStore;
