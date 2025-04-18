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
import useDebounce from "@/hooks/useDebounce";
import { useGetAllPatients } from "@/lib/react-query/dashboard/patients";
import cookieServices from "@/utils/cookieServices";

interface IProps {
  form: any;
}

const PatientSelectItem = ({ form }: IProps) => {
  const [open, setOpen] = useState(false);
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const { data: patients } = useGetAllPatients({
    token,
    search,
  });
  const patientsOption = patients?.data.items.map((patient) => ({
    value: patient.id.toString(),
    label: patient.name,
  }));
  return (
    <FormField
      control={form.control}
      name={"patient_id"}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="patient_id" className="text-nowrap">
            المريض:
          </FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="patient_id"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`border-black/20 dark:border-white/40 !h-12 text-black dark:text-white w-full justify-between`}
                >
                  {field.value?.value
                    ? patientsOption?.find(
                        (option) => option.value === field.value.value
                      )?.label
                    : "اختر..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0 z-[1000] border-black/20 dark:border-white/40">
                <Command className="text-black dark:text-white bg-foreground">
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
                          className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20"
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
      )}
    />
  );
};

export default PatientSelectItem;
