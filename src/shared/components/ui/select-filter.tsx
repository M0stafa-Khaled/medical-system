import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface IProps {
  options: { label: string; value: string }[];
  handleFilterChange: (key: string, value: string | null) => void;
  filterKey: string;
  value: string;
  placeholder?: string;
  className?: string;
}
const SelectFilter = ({
  options,
  handleFilterChange,
  value,
  filterKey,
  placeholder,
  className,
}: IProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => handleFilterChange(filterKey, value)}
    >
      <SelectTrigger
        className={`border-border hover:bg-input bg-input/30 h-12! cursor-pointer ${
          value ? "" : "text-muted-foreground"
        } ${className}`}
      >
        <SelectValue
          placeholder={placeholder || ""}
          className={`text-muted-foreground py-4`}
        />
      </SelectTrigger>
      <SelectContent className="bg-background">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer py-2.5"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
