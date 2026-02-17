import { Button } from "@/shared/components/ui/button";

import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { IPatientsReportFilter } from "@/interfaces/dashboard/reports";

interface IProps {
  filters: IPatientsReportFilter;
  setFilters: (filters: IPatientsReportFilter) => void;
}

const PatientsReportFilters = ({ filters, setFilters }: IProps) => {
  const handleFilterChange = useCallback(
    (key: keyof IPatientsReportFilter, value: string | null) =>
      setFilters({ ...filters, [key]: value }),
    [filters, setFilters]
  );

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.q}
        onChange={(e) => handleFilterChange("q", e.target.value)}
      />

      {/* Start Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
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
          className="bg-foreground w-full border-black/20 p-0 px-3 dark:border-white/40"
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
                  ? new Date(date).toLocaleDateString("en-US", {
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
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
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
          className="bg-foreground w-full border-black/20 p-0 px-3 dark:border-white/40"
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
                  ? new Date(date).toLocaleDateString("en-US", {
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

export default PatientsReportFilters;
