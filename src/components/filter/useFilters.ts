import { useState } from "react";

export function useFilters<T extends object>(initial: T) {
  const [filters, setFilters] = useState<T>(initial);

  function updateFilter<K extends keyof T>(key: K, value: T[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(initial);
  }

  return { filters, updateFilter, clearFilters };
}
