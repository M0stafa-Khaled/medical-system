import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { ITransfersReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: ITransfersReportFilter;
  setFilters: (filters: ITransfersReportFilter) => void;
}
const TransfersFilters = ({ filters, setFilters }: IProps) => {
  const handleFilterChange = (
    key: keyof ITransfersReportFilter,
    value: string | null
  ) => setFilters({ ...filters, [key]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
      <Input
        placeholder="ابحث باسم الموظف"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      <Input
        placeholder="اسم الخزينة المحول منها"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.from_treasury}
        onChange={(e) => handleFilterChange("from_treasury", e.target.value)}
      />

      <Input
        placeholder="اسم الخزينة المحول إليها"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.to_treasury}
        onChange={(e) => handleFilterChange("to_treasury", e.target.value)}
      />

      {/* Start Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.start_at ? (
              format(new Date(filters.start_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">من</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 px-3 border-black/20 dark:border-white/40 bg-foreground"
          align="start"
        >
          <Calendar
            mode="single"
            dir="rtl"
            selected={filters.start_at ? new Date(filters.start_at) : undefined}
            onSelect={(date) =>
              handleFilterChange(
                "start_at",
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
      {/* End Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.end_at ? (
              format(new Date(filters.end_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">إلي</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 px-3 border-black/20 dark:border-white/40 bg-foreground"
          align="start"
        >
          <Calendar
            mode="single"
            dir="rtl"
            selected={filters.end_at ? new Date(filters.end_at) : undefined}
            onSelect={(date) =>
              handleFilterChange(
                "end_at",
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
    </div>
  );
};

export default TransfersFilters;
