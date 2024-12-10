import { useEffect } from "react";

export const useScrollToTop = (pathname?: string) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
