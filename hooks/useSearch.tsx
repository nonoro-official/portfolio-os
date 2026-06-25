import { useState } from "react";

export const useSearch = <
  T extends {
    name: string;
  },
>(
  items: T[],
) => {
  const [query, setQuery] = useState("");

  const results = !query.trim()
    ? items
    : items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
  };
};
