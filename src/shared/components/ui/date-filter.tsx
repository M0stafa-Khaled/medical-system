import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface IProps {
  handleFilterChange: (key: string, value: string | null) => void;
  filterKey: string;
  value: string | null;
  placeholder?: string;
}
const DateFilter = ({
  handleFilterChange,
  filterKey,
  value,
  placeholder,
}: IProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"lg"}
          className={
            "hover:bg-input bg-input/30 hover:text-foreground border-border h-auto w-full justify-start"
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
          className="w-full"
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) =>
            handleFilterChange(
              filterKey,
              date
                ? new Date(date).toLocaleDateString("en-CA", {
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

export default DateFilter;
