import { IFormInput } from "@/interfaces";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
                "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-muted"
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
            className="w-full p-0 px-3 border-muted bg-foreground"
            align="start"
          >
            <Calendar
              mode="single"
              dir="rtl"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                const formattedDated = date
                  ? new Date(date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "";
                field.onChange(formattedDated);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DateFormItem;
