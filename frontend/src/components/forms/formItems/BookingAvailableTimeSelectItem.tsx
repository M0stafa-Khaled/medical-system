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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IFormInput } from "@/interfaces";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  form: UseFormReturn;
  input: IFormInput;
  times: string[];
}

const BookingAvailableTimeSelectItem = ({ form, input, times }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={input.name} className="text-nowrap">
            {input.label}
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={input.name}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`border-muted w-full !h-12 text-black dark:text-white justify-between overflow-hidden`}
                >
                  {field.value
                    ? times?.find((time) => time === field.value) || field.value
                    : "اختر"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0 z-[1000] border-black/20 dark:border-white/40">
                <Command className="text-black dark:text-white bg-foreground">
                  <CommandInput
                    placeholder="اختر او ابحث بالاسم او رقم الهاتف"
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>لا يوجد</CommandEmpty>
                    <CommandGroup>
                      {times?.map((time) => (
                        <CommandItem
                          className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20"
                          key={time}
                          value={time}
                          onSelect={() => {
                            field.onChange(time);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === time ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {time}
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
      )}
    />
  );
};

export default BookingAvailableTimeSelectItem;
