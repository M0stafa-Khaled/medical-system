import { useState, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IFormInput } from "@/interfaces";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  options: IOption[];
  input: IFormInput;
  field: ControllerRenderProps<any>;
}
const SelectAndWriteFormItem = ({ options, input, field }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  const isCustomValue =
    searchValue &&
    !options.some(
      (option) => option.label.toLowerCase() === searchValue.toLowerCase()
    );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="border-muted w-full h-12! text-black dark:text-white justify-between overflow-hidden"
        >
          {field.value
            ? options.find((option) => option.value === field.value)?.label ||
              field.value
            : input.placeholder || "اختر..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] sm:w-[400px] md:w-[370px] p-0 z-1000 border-black/20 dark:border-white/40">
        <Command className="text-black dark:text-white bg-foreground">
          <CommandInput
            placeholder="ابحث أو اكتب جديد"
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isCustomValue) {
                e.preventDefault();
                field.onChange(searchValue);
                setOpen(false);
              }
            }}
          />
          <CommandList>
            <CommandEmpty>
              {isCustomValue ? (
                <div
                  onClick={() => {
                    field.onChange(searchValue);
                    setOpen(false);
                  }}
                  className="py-2.5 px-2 cursor-pointer hover:bg-muted text-[13px]"
                >
                  إضافة: <span className="font-semibold">{searchValue}</span>
                </div>
              ) : (
                "لا يوجد نتائج"
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    field.onChange(option.value);
                    setOpen(false);
                    setSearchValue("");
                  }}
                  className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20 text-[13px]"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectAndWriteFormItem;
