import { useState, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { IFormInput } from "@/shared/types";

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
          className="border-muted h-12! w-full justify-between overflow-hidden text-black dark:text-white"
        >
          {field.value
            ? options.find((option) => option.value === field.value)?.label ||
              field.value
            : input.placeholder || "اختر..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-1000 w-[300px] border-black/20 p-0 sm:w-[400px] md:w-[370px] dark:border-white/40">
        <Command className="bg-foreground text-black dark:text-white">
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
                  className="hover:bg-muted cursor-pointer px-2 py-2.5 text-[13px]"
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
                  className="cursor-pointer py-2.5 text-[13px] text-black hover:bg-blue-200/20 dark:text-white"
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
