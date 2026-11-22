import { useCallback, useState } from 'react';

export function useFavorites(initialIds = []) {
  const [ids, setIds] = useState(() => Array.from(new Set(initialIds)));

  const toggle = useCallback((id) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  return { ids, toggle, clear };
}