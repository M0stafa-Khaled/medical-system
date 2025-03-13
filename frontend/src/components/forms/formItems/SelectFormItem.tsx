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
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { IFormInput } from "@/interfaces";
import { useMemo, useState } from "react";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  options: { label: string; value: string }[];
  isMulti?: boolean;
  input: IFormInput;
  form: UseFormReturn<any>;
}

const SelectFormItem = ({ field, options, input }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  return (
    <>
      <FormItem>
        <FormLabel htmlFor={input.name} className="text-nowrap">
          {input.label}:
        </FormLabel>
        <FormControl>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id={input.name}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full border-black/20 dark:border-white/40 !h-12 text-black dark:text-white justify-between `}
              >
                {field.value?.value
                  ? options.find(
                      (option) => option.value === field.value?.value
                    )?.label
                  : "اختر..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              id={input.name}
              className="w-[300px] p-0 z-[1000] border-black/20 dark:border-white/40"
            >
              <Command
                id={input.name}
                className="text-black dark:text-white bg-foreground"
              >
                <CommandInput
                  placeholder="اختر او ابحث بالاسم"
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
                <CommandList id={input.name}>
                  <CommandEmpty>لا يوجد</CommandEmpty>
                  <CommandGroup id={input.name}>
                    {filteredOptions.map((option) => (
                      <CommandItem
                        className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20 text-[13px]"
                        key={option.label}
                        id={input.name}
                        {...field}
                        value={option.label}
                        onSelect={() => {
                          field.onChange({
                            value: option.value,
                            label: option.label,
                          });
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option.value
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
    </>
  );
};

export default SelectFormItem;
