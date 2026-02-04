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
import { FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";
import cookieServices from "@/utils/cookieServices";
import { IFormInput } from "@/interfaces";
import { ControllerRenderProps } from "react-hook-form";
import { useGetAllAnalysis } from "@/lib/react-query/main";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
}
const AnalysisSelectFormItem = ({ field, input }: IProps) => {
  const [open, setOpen] = useState(false);
  const token = cookieServices.getToken()!;
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const { data: analytics } = useGetAllAnalysis({
    token,
    search,
  });

  const analysisOptions =
    analytics?.data.items?.map((analysis) => ({
      value: analysis.name,
      label: analysis.name,
    })) ?? [];

  const selectedOption =
    analysisOptions.find((option) => option.value === field.value) ??
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
            className="border-muted w-full h-12! text-black dark:text-white justify-between overflow-hidden"
          >
            {selectedOption ? selectedOption.label : "اختر..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] sm:w-[400px] md:w-[370px] p-0 z-1000 border-black/20 dark:border-white/40">
          <Command className="text-black dark:text-white bg-foreground">
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
                  className="py-2.5 px-2 cursor-pointer hover:bg-muted text-[13px]"
                >
                  إضافة: <span className="font-semibold">{searchTerm}</span>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {analysisOptions.map((option) => (
                  <CommandItem
                    className="py-2.5 cursor-pointer text-black dark:text-white hover:bg-blue-200/20"
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

export default AnalysisSelectFormItem;
