import type { SearchFilters, Website } from "@/types";
import { useCallback, useMemo, useState } from "react";

export function useSearch(websites: Website[] | undefined) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
  });

  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const reset = useCallback(() => {
    setFilters({ query: "", category: "" });
  }, []);

  const results = useMemo(() => {
    if (!websites) return [];
    const q = filters.query.trim().toLowerCase();
    const cat = filters.category;

    return websites.filter((site) => {
      const matchesCategory = !cat || site.category === cat;
      if (!q) return matchesCategory;
      const matchesQuery =
        site.name.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q)) ||
        site.url.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [websites, filters]);

  return { filters, results, setQuery, setCategory, reset };
}
