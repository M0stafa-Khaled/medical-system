import { IFormInput } from "@/interfaces";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
  form: UseFormReturn;
  allowedDay: string;
}
const BookingDateItem = ({ input, form, allowedDay }: IProps) => {
  const today = new Date();

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

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
                  disabled={
                    allowedDay && allowedDay !== ""
                      ? (date) => {
                          date.setHours(0, 0, 0, 0);

                          const dayName = date
                            .toLocaleDateString("en-US", { weekday: "long" })
                            .toLowerCase();
                          const isNotAllowedDay = dayName !== allowedDay;
                          const todayDate = new Date();
                          todayDate.setHours(0, 0, 0, 0);
                          const firstAvailableDay = new Date(todayDate);
                          if (dayName !== allowedDay) {
                            while (
                              firstAvailableDay
                                .toLocaleDateString("en-US", {
                                  weekday: "long",
                                })
                                .toLowerCase() !== allowedDay
                            ) {
                              firstAvailableDay.setDate(
                                firstAvailableDay.getDate() + 1
                              );
                            }
                          }

                          const isBeforeToday = date < todayDate;
                          const isAfterMaxDate = date > maxDate;

                          return (
                            isNotAllowedDay || isBeforeToday || isAfterMaxDate
                          );
                        }
                      : false
                  }
                  defaultMonth={today}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>
            (لا يمكن ان يتجاوز موعد الحجز شهر من الان)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingDateItem;
