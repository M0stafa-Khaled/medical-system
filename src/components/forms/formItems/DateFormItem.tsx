import { IFormInput } from "@/shared/types";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

interface IProps {
  field: ControllerRenderProps<any>;
  input: IFormInput;
}
const DateFormItem = ({ input, field }: IProps) => {
  return (
    <FormItem>
      <FormLabel htmlFor={input.name} className="text-nowrap">
        {input.label}
      </FormLabel>

      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={input.name}
              variant={"outline"}
              className={
                "hover:bg-foreground dark:hover:bg-foreground border-muted h-auto w-full justify-start py-3 text-right font-normal text-black hover:text-black dark:text-white dark:hover:text-white"
              }
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {field.value ? (
                format(field.value, "dd-MM-yyyy")
              ) : (
                <span className="text-muted-foreground">{input.label} </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="border-muted bg-foreground w-full p-0 px-3"
            align="start"
          >
            <Calendar
              mode="single"
              dir="rtl"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                const formattedDated = date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "";
                field.onChange(formattedDated);
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DateFormItem;
