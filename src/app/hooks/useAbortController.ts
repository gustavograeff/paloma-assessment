import { useCallback, useEffect, useRef } from "react";

export const useAbortController = () => {
  const abortController = useRef(new AbortController());

  const isMounted = useRef(false);

  const abortReset = useCallback((reason: string) => {
    if (!abortController.current.signal.aborted)
      abortController.current.abort(reason);

    abortController.current = new AbortController();
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const abortControllerInstance = abortController.current;

    return () => {
      abortControllerInstance.abort("Component unmount");
    };
  }, []);

  return {
    abortController,
    abortReset,
  };
};
