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
import { cn } from "@/shared/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useDebounce from "@/shared/hooks/useDebounce";
import { IFormInput } from "@/shared/types";
import { ControllerRenderProps } from "react-hook-form";
import { useGetAllPatients } from "@/features/dashboard/patients";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
}

export const PatientSelectItem = ({ field, input }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const { data: patients } = useGetAllPatients({
    search,
  });

  const patientsOption = patients?.data.items.map((patient) => ({
    value: patient.id.toString(),
    label: patient.name,
  }));
  return (
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
              className={`dark:bg-input/30 hover:bg-input/10 hover:text-foreground dark:hover:bg-input/50! border-muted hover: h-12! w-full justify-between overflow-hidden`}
            >
              {field.value
                ? patientsOption?.find((option) => option.value === field.value)
                    ?.label
                : "اختر..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-1000 w-75 p-0 sm:w-100 md:w-92.5">
            <Command id={input.name} className="bg-background">
              <CommandInput
                placeholder="اختر او ابحث بالاسم او رقم الهاتف"
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>لا يوجد</CommandEmpty>
                <CommandGroup>
                  {patientsOption?.map((option) => (
                    <CommandItem
                      className="cursor-pointer py-2.5 text-[13px]"
                      key={option.label}
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
