import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

interface IProps {
  placeholder: string;
}
const SearchInput = ({ placeholder }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  return (
    <Input
      placeholder={placeholder}
      className="w-full md:max-w-md py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
      onChange={(e) => {
        const value = e.target.value;
        if (value) {
          setSearchParams({ q: value });
        } else {
          setSearchParams({});
        }
      }}
      value={search ?? ""}
      type="search"
    />
  );
};

export default SearchInput;
