interface Searchable {
  name: string;
}

// Can use this function if hook useSearch get Errors again //
const search = <T extends Searchable>(searchTerm: string, items: T[] = []) => {
  if (!searchTerm) return items;

  items.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
  );
};

export default search;
