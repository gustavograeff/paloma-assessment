import { type MutableRefObject, useEffect, useRef } from "react";

/**
 * Because of how React works, callbacks should never receive React state parameters directly
 * when using timers. To pass state values and ensure they stay up-to-date, use React refs
 * that point to the current state value.
 */
export const useDebounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  milliseconds = 500
): ((...args: Parameters<T>) => void) => {
  const timerRef: MutableRefObject<ReturnType<typeof setTimeout> | null> =
    useRef(null);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, milliseconds);
  };

  useEffect(() => {
    return () => {
      if (!timerRef.current) return;

      clearTimeout(timerRef.current);
    };
  }, [milliseconds]);

  return debouncedCallback as unknown as T;
};
