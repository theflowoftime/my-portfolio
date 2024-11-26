import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHashNavigation = () => {
  const { hash, state } = useLocation();

  useEffect(() => {
    if (state) {
      let id = hash.slice(1);

      if (!id || !id.length) {
        id = "top";
      }

      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash, state]);
};

export default useHashNavigation;
