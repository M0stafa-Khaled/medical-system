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
      className="border-muted placeholder:text-muted-foreground h-auto py-2.5 placeholder:h-14 placeholder:text-sm md:max-w-md md:py-3"
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
