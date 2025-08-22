import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounced;
}
