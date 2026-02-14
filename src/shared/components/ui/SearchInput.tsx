import { Input } from "@/shared/components/ui/input";
import { useSearchParams } from "react-router";

interface IProps {
  placeholder: string;
}
const SearchInput = ({ placeholder }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  return (
    <Input
      placeholder={placeholder}
      className="placeholder:text-muted-foreground h-auto w-full border-black/20 py-2.5 text-black placeholder:h-14 placeholder:text-sm md:max-w-md md:py-3 dark:border-white/40 dark:text-white"
      onChange={(e) => {
        const value = e.target.value;
        if (value) setSearchParams({ q: value });
        else setSearchParams({});
      }}
      value={search ?? ""}
      type="search"
    />
  );
};

export default SearchInput;
