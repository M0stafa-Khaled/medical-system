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
import truncateText from "@/utils/truncateText";

interface IProps {
  field: ControllerRenderProps<any>;
  options: { label: string; value: string }[];
  input: IFormInput;
  isOptionalField?: (fieldName: string) => boolean;
}

const SelectFormItem = ({ field, options, input, isOptionalField }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    return options?.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

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
              className={`dark:bg-input/30 hover:bg-input/10 dark:hover:bg-input/50! border-muted h-12! w-full justify-between overflow-hidden text-black hover:text-black dark:text-white dark:hover:text-white`}
            >
              {truncateText(
                field.value
                  ? options?.find((option) => option.value === field.value)
                      ?.label || "اختر..."
                  : "اختر...",
                50
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={input.name}
            className="z-1000 w-75 p-0 sm:w-100 md:w-92.5"
          >
            <Command id={input.name} className="bg-background">
              <CommandInput
                placeholder="اختر او ابحث بالاسم"
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList id={input.name}>
                <CommandEmpty>لا يوجد</CommandEmpty>
                <CommandGroup id={input.name}>
                  {filteredOptions?.map((option) => (
                    <CommandItem
                      className="cursor-pointer py-2.5 text-[13px]"
                      key={option.label}
                      id={input.name}
                      {...field}
                      value={option.label}
                      onSelect={() => {
                        field.onChange(option.value);
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
  );
};

export default SelectFormItem;
