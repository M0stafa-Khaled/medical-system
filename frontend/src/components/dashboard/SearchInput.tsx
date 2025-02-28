import { Input } from "@/components/ui/input";

interface IProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  placeholder: string;
}
const SearchInput = ({
  searchKeyword,
  setSearchKeyword,
  placeholder,
}: IProps) => {
  return (
    <Input
      placeholder={placeholder}
      className="w-full md:max-w-md py-3 placeholder:h-14 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-black/50 dark:placeholder:text-white/50"
      onChange={(e) => setSearchKeyword(e.target.value)}
      value={searchKeyword}
    />
  );
};

export default SearchInput;
