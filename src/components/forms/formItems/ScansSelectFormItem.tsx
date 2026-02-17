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
import { FormMessage } from "@/shared/components/ui/form";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import useDebounce from "@/shared/hooks/useDebounce";
import { IFormInput } from "@/shared/types";
import { ControllerRenderProps } from "react-hook-form";
import { useGetAllScans } from "@/features/scans";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
}
const ScansSelectFormItem = ({ field, input }: IProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const { data: scans } = useGetAllScans({
    search,
  });

  const scansOptions =
    scans?.data.items?.map((scans) => ({
      value: scans.name,
      label: scans.name,
    })) ?? [];

  const selectedOption =
    scansOptions.find((option) => option.value === field.value) ??
    (field.value ? { value: field.value, label: field.value } : undefined);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={input.name}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="border-muted h-12! w-full justify-between overflow-hidden text-black dark:text-white"
          >
            {selectedOption ? selectedOption.label : "اختر..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-1000 w-75 border-black/20 p-0 sm:w-100 md:w-92.5 dark:border-white/40">
          <Command className="bg-foreground text-black dark:text-white">
            <CommandInput
              placeholder="اختر أو اكتب اسم جديد"
              value={searchTerm}
              onValueChange={setSearchTerm}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  field.onChange(searchTerm);
                  setOpen(false);
                }
              }}
            />
            <CommandList>
              <CommandEmpty>
                <div
                  onClick={() => {
                    field.onChange(searchTerm);
                    setOpen(false);
                  }}
                  className="hover:bg-muted cursor-pointer px-2 py-2.5 text-[13px]"
                >
                  إضافة: <span className="font-semibold">{searchTerm}</span>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {scansOptions.map((option) => (
                  <CommandItem
                    className="cursor-pointer py-2.5 text-black hover:bg-blue-200/20 dark:text-white"
                    key={option.value}
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
      <FormMessage />
    </>
  );
};

export default ScansSelectFormItem;
