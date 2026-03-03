import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { useSearchParams } from "react-router";

interface IProps {
  placeholder: string;
  className?: string;
}
const SearchInput = ({ placeholder, className }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  return (
    <Input
      placeholder={placeholder}
      className={cn(
        "border-border placeholder:text-muted-foreground h-auto w-full py-3 placeholder:h-14 placeholder:text-sm md:max-w-md",
        className
      )}
      onChange={(e) => {
        const value = e.target.value;
        setSearchParams({ q: value });
      }}
      value={search ?? ""}
      type="search"
    />
  );
};

export default SearchInput;
