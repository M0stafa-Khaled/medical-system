import { IFormInput } from "@/shared/types";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

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
                  variant="outline"
                  data-empty={!field.value}
                  className={`dark:bg-input/30 hover:bg-input/10 dark:hover:bg-input/50! border-muted h-12! w-full justify-start text-black hover:text-black dark:text-white dark:hover:text-white`}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "dd-MM-yyyy")
                  ) : (
                    <span className="text-muted-foreground">تاريخ الحجز</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-2xs p-0" align="start">
                <Calendar
                  className="w-full"
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
                            .toLocaleDateString("en-CA", { weekday: "long" })
                            .toLowerCase();
                          const isNotAllowedDay = dayName !== allowedDay;
                          const todayDate = new Date();
                          todayDate.setHours(0, 0, 0, 0);
                          const firstAvailableDay = new Date(todayDate);
                          if (dayName !== allowedDay) {
                            while (
                              firstAvailableDay
                                .toLocaleDateString("en-CA", {
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
