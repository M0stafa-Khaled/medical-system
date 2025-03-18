import { IFormInput } from "@/interfaces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
  form: any;
  allowedDay: string;
}
const BookingDateItem = ({ input, form, allowedDay }: IProps) => {
  const today = new Date();
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-muted"
                  }
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "dd-MM-yyyy")
                  ) : (
                    <span className="text-muted-foreground">تاريخ الحجز</span>
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
                  disabled={(date) => {
                    // check if the day is allowed and not past date
                    const dayName = date
                      .toLocaleDateString("en-US", { weekday: "long" })
                      .toLowerCase();
                    const isNotAllowedDay = dayName !== allowedDay;
                    const isPastDate =
                      date.getTime() < today.setHours(0, 0, 0, 0);
                    const isDisabled = isNotAllowedDay || isPastDate;
                    return isDisabled;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingDateItem;
