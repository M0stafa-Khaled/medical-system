import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { IBookingsReportFilter } from "@/interfaces/dashboard/reports";
import { useGetAllClinics } from "@/features/dashboard/clinics";

interface IProps {
  filters: IBookingsReportFilter;
  setFilters: (filters: IBookingsReportFilter) => void;
}
const BookingsReportFilters = ({ filters, setFilters }: IProps) => {
  const { data: clinics } = useGetAllClinics({});

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="placeholder:text-muted-foreground h-auto border-black/20 py-3 text-black placeholder:h-14 dark:border-white/40 dark:text-white"
        type="search"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />
      {/* Clinic */}
      <Select
        value={filters.clinic}
        onValueChange={(value) => handleFilterChange("clinic", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.clinic
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="العيادة"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          {clinics?.data?.map((clinic) => (
            <SelectItem
              key={clinic.name}
              value={clinic.name.trim()}
              className="cursor-pointer py-2.5"
            >
              {clinic.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

      {/* Booking Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "hover:bg-foreground dark:hover:bg-foreground h-auto w-full justify-start border-black/20 py-3 text-right font-normal text-black hover:text-black dark:border-white/40 dark:text-white dark:hover:text-white"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.booking_date ? (
              format(new Date(filters.booking_date), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">تاريخ الحجز</span>
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
            selected={
              filters.booking_date ? new Date(filters.booking_date) : undefined
            }
            onSelect={(date) =>
              handleFilterChange(
                "booking_date",
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

      {/* Status */}
      <Select
        value={filters.status}
        onValueChange={(value) => handleFilterChange("status", value)}
        dir="rtl"
      >
        <SelectTrigger
          className={`h-12! border-black/20 dark:border-white/40 ${
            filters.status
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الحالة"
            className={`text-muted-foreground py-4`}
          />
        </SelectTrigger>
        <SelectContent className="bg-foreground border-black/20 text-black dark:border-white/40 dark:text-white">
          <SelectItem value="all" className="cursor-pointer py-2.5">
            الكل
          </SelectItem>
          <SelectItem value="pending" className="cursor-pointer py-2.5">
            قيد الانتظار
          </SelectItem>
          <SelectItem value="completed" className="cursor-pointer py-2.5">
            مكتمل
          </SelectItem>
          <SelectItem value="collected" className="cursor-pointer py-2.5">
            تم التحصيل
          </SelectItem>
          <SelectItem value="cancelled" className="cursor-pointer py-2.5">
            ملغي
          </SelectItem>
          <SelectItem value="no-show" className="cursor-pointer py-2.5">
            لم يحضر
          </SelectItem>
          <SelectItem value="ended" className="cursor-pointer py-2.5">
            منتهى
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsReportFilters;
