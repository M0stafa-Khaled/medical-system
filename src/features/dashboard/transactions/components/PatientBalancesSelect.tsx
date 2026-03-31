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
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useDebounce from "@/shared/hooks/useDebounce";
import { IFormInput } from "@/shared/types";
import { useGetAllPatientTransactionsBalances } from "../queriesAndMutations";
import { ControllerRenderProps } from "react-hook-form";

interface IProps {
  form: any;
  input: IFormInput;
  patientId: string;
  field: ControllerRenderProps;
}

export const PatientBalancesSelect = ({
  form,
  input,
  patientId,
  field,
}: IProps) => {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const { data: patientTransactionsBalances } =
    useGetAllPatientTransactionsBalances({
      patientId: patientId ? patientId?.toString() : "",
      search,
    });

  useEffect(() => {
    const subscription = form.watch(
      (value: any, { name }: { name: string }) => {
        if (name === "transaction_code") {
          const balance = patientTransactionsBalances?.data.find(
            (balance) => balance.transaction_code === value.transaction_code
          );
          form.setValue("amount", balance?.balance);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [form, patientTransactionsBalances?.data]);

  const patientsOption = patientTransactionsBalances?.data.map(
    (patientBalance) => ({
      value: patientBalance.transaction_code,
      label: patientBalance.transaction_code,
    })
  );
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
              className={`dark:bg-input/30 hover:bg-input/10 hover:text-foreground dark:hover:bg-input/50! border-muted h-11! w-full justify-between overflow-hidden`}
            >
              {field.value
                ? patientsOption?.find((option) => option.value === field.value)
                    ?.label
                : "اختر..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={input.name}
            className="z-1000 w-75 p-0 sm:w-100 md:w-92.5"
          >
            <Command id={input.name} className="bg-background">
              <CommandInput
                placeholder="اختر او ابحث برقم الإيصال"
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
