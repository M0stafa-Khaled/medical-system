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
              size={"lg"}
              className={
                "dark:bg-input/30 hover:bg-input/10 dark:hover:bg-input/50! hover:text-foreground h-auto w-full justify-start"
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
          <PopoverContent className="border-muted p-0" align="start">
            <Calendar
              mode="single"
              className="w-full"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => {
                const formattedDated = date ? format(date, "yyyy-MM-dd") : "";
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
