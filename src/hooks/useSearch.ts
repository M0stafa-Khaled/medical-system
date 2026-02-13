import { useState, useMemo } from "react";

interface Searchable {
  name: string;
}

export const useSearch = <T extends Searchable>(items: T[] = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const lowerSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    );
  }, [items, searchTerm]);

  return { filteredItems, searchTerm, setSearchTerm };
};
