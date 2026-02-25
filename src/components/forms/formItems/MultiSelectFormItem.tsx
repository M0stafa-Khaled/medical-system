import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { IFormInput } from "@/shared/types";
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
    return options.filter((option) => {
      return option.label.toLowerCase().includes(searchValue);
    });
  }, [options, searchValue]);

  const handleSelect = (value: string) => {
    const currentValues: string[] = Array.isArray(field.value)
      ? field.value
      : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((val) => val !== value)
      : [...currentValues, value];

    field.onChange(newValues);
  };

  return (
    <FormItem>
      <FormLabel htmlFor={input.name} className="text-nowrap">
        {input.label}
        {isOptionalField && isOptionalField(input.name) && (
          <span className="text-muted-foreground text-xs"> (اختياري)</span>
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
              className={`dark:bg-input/30 hover:bg-input/10 dark:hover:bg-input/50! border-muted hover: relative flex h-auto min-h-11! w-full flex-wrap items-center justify-start gap-1 overflow-hidden pl-8! text-black dark:hover:text-white`}
            >
              {field.value &&
              Array.isArray(field.value) &&
              field.value.length > 0
                ? field.value.map((item, idx: number) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-400/20 px-2 py-1 text-sm"
                    >
                      {options
                        .find((option) => option.value === item)
                        ?.label.split("-")
                        .join(" ")}
                    </span>
                  ))
                : `اختر ${input.label}...`}
              <ChevronsUpDown className="absolute top-1/2 left-3 ml-2 h-4 w-4 shrink-0 -translate-y-1/2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={input.name}
            className="z-1000 w-75 p-0 sm:w-100 md:w-92.5"
          >
            <Command id={input.name} className="bg-background">
              <CommandInput
                placeholder="ابحث ..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList id={input.name}>
                {filteredOptions.length === 0 && (
                  <CommandEmpty id={input.name}>لا يوجد نتائج</CommandEmpty>
                )}
                <CommandGroup id={input.name}>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      className="cursor-pointer py-2.5 text-sm text-[13px] text-black hover:bg-blue-200/20 dark:text-white"
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label.split("-").join(" ")}
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
