import { useCallback, useRef } from "react";

export default function useThrottle<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledFunc = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) return;

      func(...args);

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, delay);
    },
    [func, delay]
  );

  return throttledFunc;
}
