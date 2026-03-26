import { IFormInput } from "@/shared/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

interface IProps {
  field: ControllerRenderProps<FieldValues, string>;
  input: IFormInput;
  allowedDay: string;
}

const AFTER_MIDNIGHT_GRACE_HOURS = 6;

const toStartOfDay = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const BookingDateItem = ({ input, allowedDay, field }: IProps) => {
  const now = new Date();
  const today = toStartOfDay(now);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayDayName = yesterday
    .toLocaleDateString("en-CA", { weekday: "long" })
    .toLowerCase();

  const canUsePreviousAllowedDay =
    now.getHours() < AFTER_MIDNIGHT_GRACE_HOURS &&
    allowedDay &&
    yesterdayDayName === allowedDay;

  const minDate = canUsePreviousAllowedDay ? yesterday : today;

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  return (
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
              className={`dark:bg-input/30 hover:bg-input/10 dark:hover:bg-input/50! border-muted hover: h-12! w-full justify-start`}
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
                      const normalizedDate = toStartOfDay(date);

                      const dayName = normalizedDate
                        .toLocaleDateString("en-CA", { weekday: "long" })
                        .toLowerCase();
                      const isNotAllowedDay = dayName !== allowedDay;

                      const isBeforeMinDate = normalizedDate < minDate;
                      const isAfterMaxDate = normalizedDate > maxDate;

                      return (
                        isNotAllowedDay || isBeforeMinDate || isAfterMaxDate
                      );
                    }
                  : false
              }
              defaultMonth={minDate}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormDescription>
        (لا يمكن ان يتجاوز موعد الحجز شهر من الآن)
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default BookingDateItem;
