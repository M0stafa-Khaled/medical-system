import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import cookieServices from "@/utils/cookieServices";
import { format } from "date-fns";
import { IBookingsFilter } from "@/interfaces/dashboard/bookings";

interface IProps {
  filters: IBookingsFilter;
  setFilters: (filters: IBookingsFilter) => void;
}
const BookingsFilters = ({ filters, setFilters }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: clinics } = useGetAllClinics({ token });

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-4">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="placeholder:h-14 py-3 h-auto border-black/20 text-black dark:text-white dark:border-white/40 placeholder:text-muted-foreground"
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
          className={`border-black/20 dark:border-white/40 h-12!  ${
            filters.clinic
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="العيادة"
            className={`py-4 text-muted-foreground`}
          />
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white bg-foreground border-black/20 dark:border-white/40">
          <SelectItem value="all" className="py-2.5 cursor-pointer">
            الكل
          </SelectItem>
          {clinics?.data?.map((clinic) => (
            <SelectItem
              key={clinic.name}
              value={clinic.name.trim()}
              className="py-2.5 cursor-pointer"
            >
              {clinic.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Created Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
            }
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {filters.created_at ? (
              format(new Date(filters.created_at), "dd-MM-yyyy")
            ) : (
              <span className="text-muted-foreground">تاريخ الإنشاء</span>
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
            selected={
              filters.created_at ? new Date(filters.created_at) : undefined
            }
            onSelect={(date) =>
              handleFilterChange(
                "created_at",
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
              "w-full justify-start text-right font-normal text-black dark:text-white py-3 h-auto hover:bg-foreground hover:text-black dark:hover:text-white dark:hover:bg-foreground border-black/20 dark:border-white/40"
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
          className="w-full p-0 px-3 border-black/20 dark:border-white/40 bg-foreground"
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
          className={`border-black/20 dark:border-white/40 h-12!  ${
            filters.status
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          <SelectValue
            placeholder="الحالة"
            className={`py-4 text-muted-foreground`}
          />
        </SelectTrigger>
        <SelectContent className="text-black dark:text-white bg-foreground border-black/20 dark:border-white/40">
          <SelectItem value="all" className="py-2.5 cursor-pointer">
            الكل
          </SelectItem>
          <SelectItem value="pending" className="py-2.5 cursor-pointer">
            قيد الانتظار
          </SelectItem>
          <SelectItem value="completed" className="py-2.5 cursor-pointer">
            مكتمل
          </SelectItem>
          <SelectItem value="collected" className="py-2.5 cursor-pointer">
            تم التحصيل
          </SelectItem>
          <SelectItem value="cancelled" className="py-2.5 cursor-pointer">
            ملغي
          </SelectItem>
          <SelectItem value="no-show" className="py-2.5 cursor-pointer">
            لم يحضر
          </SelectItem>
          <SelectItem value="ended" className="py-2.5 cursor-pointer">
            منتهى
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsFilters;
