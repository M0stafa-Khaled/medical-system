import { useState, useEffect, useMemo } from "react";

interface Searchable {
  name: string;
}

export const useSearch = <T extends Searchable>(items: T[] = []) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  const memoizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    if (!items.length) return;

    if (!searchTerm) return setFilteredItems(items);

    const results = memoizedItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    setFilteredItems(results);
  }, [searchTerm, memoizedItems, items]);

  return { filteredItems, searchTerm, setSearchTerm };
};
