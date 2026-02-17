// components/shared/DatePickerPopover.tsx
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
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
        <Button
          variant={"outline"}
          size={"lg"}
          className={
            "hover:text-foreground h-auto w-full justify-start hover:bg-transparent"
          }
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {value ? (
            format(new Date(value), "dd-MM-yyyy")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-muted p-0" align="start">
        <Calendar
          mode="single"
          className="w-full"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) =>
            onChange(
              date
                ? new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : null
            )
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default ChartDate;
