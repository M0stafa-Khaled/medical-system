// components/shared/DatePickerPopover.tsx
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface IProps {
  value: string | null;
  onChange: (date: string | null) => void;
  placeholder: string;
}

const ChartDate = ({ value, onChange, placeholder }: IProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full justify-start text-right font-normal py-3 h-auto border-black/20 dark:border-white/40">
          <CalendarIcon className="ml-2 h-4 w-4" />
          {value ? (
            format(new Date(value), "dd-MM-yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 px-3 border-black/20 dark:border-white/40 dark:bg-primary dark:text-primary-foreground"
        align="start"
      >
        <Calendar
          mode="single"
          dir="rtl"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) =>
            onChange(
              date
                ? new Date(date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : null
            )
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default ChartDate;
