import useScrollStore from "@/stores/scroll-store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollHash = () => {
  const { hash } = useLocation();
  const setHash = useScrollStore((state) => state.setHash);
  const scrollToHash = useScrollStore((state) => state.scrollToHash);

  useEffect(() => {
    const targetHash = hash || "#top";

    if (targetHash) {
      setHash(targetHash);
      scrollToHash();
    }
  }, [hash, setHash, scrollToHash]);
};

export default useScrollHash;
