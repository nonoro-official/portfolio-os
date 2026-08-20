import { useState } from "react";

type FacetAccessor<T> = (item: T) => readonly string[];

interface UseStoreFiltersOptions<T> {
  items: readonly T[];
  facets: Record<string, FacetAccessor<T>>;
  query?: string;
  searchOn?: (item: T) => string;
}

export function useStoreFilters<T extends { name: string }>({
  items,
  facets,
  query = "",
  searchOn = (item) => item.name,
}: UseStoreFiltersOptions<T>) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggle = (facet: string, value: string, checked: boolean) => {
    setSelected((prev) => {
      const current = prev[facet] ?? [];
      return {
        ...prev,
        [facet]: checked
          ? [...current, value]
          : current.filter((v) => v !== value),
      };
    });
  };

  const reset = () => setSelected({});

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesFacets = Object.entries(facets).every(([key, accessor]) => {
      const active = selected[key] ?? [];
      return (
        active.length === 0 || accessor(item).some((v) => active.includes(v))
      );
    });

    const matchesQuery =
      normalizedQuery === "" ||
      searchOn(item).toLowerCase().includes(normalizedQuery);

    return matchesFacets && matchesQuery;
  });

  const isFiltering =
    normalizedQuery !== "" || Object.values(selected).some((v) => v.length > 0);

  return { filtered, isFiltering, selected, toggle, reset };
}
