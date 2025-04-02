import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFormInput } from "@/interfaces";
import { useMemo, useState } from "react";

interface IOption {
  value: string;
  label: string;
}

interface IProps {
  field: ControllerRenderProps;
  options: IOption[];
  input: IFormInput;
  isOptionalField?: (fieldName: string) => boolean;
}

const MultiSelectFormItem = ({
  field,
  options,
  input,
  isOptionalField,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredOptions = useMemo<IOption[]>(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  const handleSelect = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;

    const currentValues: IOption[] = Array.isArray(field.value)
      ? field.value
      : [];

    const valueExists = currentValues.some((item) => item.value === value);

    const newValues = valueExists
      ? currentValues.filter((item) => item.value !== value)
      : [
          ...currentValues,
          { value: selectedOption.value, label: selectedOption.label },
        ];

    field.onChange(newValues);
  };

  const isValueSelected = (value: string): boolean => {
    if (!field.value || !Array.isArray(field.value)) return false;
    return field.value.some((item: IOption) => item.value === value);
  };

  return (
    <FormItem>
      <FormLabel htmlFor={input.name} className="text-nowrap">
        {input.label}
        {isOptionalField && isOptionalField(input.name) && (
          <span className="text-xs text-muted-foreground"> (اختياري)</span>
        )}
      </FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={input.name}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="relative border-muted text-black dark:text-white w-full !min-h-12 !h-auto overflow-hidden flex justify-start items-center flex-wrap gap-1 !pl-8 capitalize"
            >
              {field.value &&
              Array.isArray(field.value) &&
              field.value.length > 0
                ? field.value.map((item: IOption, idx: number) => (
                    <span
                      key={idx}
                      className="text-sm text-black dark:text-white px-2 py-1 rounded-full bg-blue-400/20"
                    >
                      {item.label}
                    </span>
                  ))
                : `اختر ${input.label}...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 absolute top-1/2 -translate-y-1/2 left-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={input.name}
            className="w-[300px] sm:w-[400px] md:w-[370px] xl:w-[420px] p-0 z-[1000] border-none border-black/20 dark:border-white/40"
          >
            <Command
              id={input.name}
              className="text-black dark:text-white bg-foreground"
            >
              <CommandInput
                placeholder="ابحث ..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList id={input.name}>
                <CommandEmpty>لا يوجد</CommandEmpty>
                <CommandGroup id={input.name}>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      className="py-2.5 cursor-pointer text-sm text-black dark:text-white hover:bg-blue-200/20 text-[13px]"
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isValueSelected(option.value)
                            ? "opacity-100"
                            : "opacity-0"
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
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default MultiSelectFormItem;
