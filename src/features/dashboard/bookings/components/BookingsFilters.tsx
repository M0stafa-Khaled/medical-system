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
import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { IBookingsFilter } from "../types";

export const BookingsFilters = () => {
  const { data: clinics } = useGetAllClinics({});

  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IBookingsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      created_at: searchParams.get("created_at") || "",
      booking_date: searchParams.get("booking_date") || "",
      status: searchParams.get("status") || "",
      clinic: searchParams.get("clinic") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams]
  );
  const setFilters = (newFilters: IBookingsFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Input
        placeholder="ابحث باسم الطبيب"
        className="border-muted placeholder:text-muted-foreground h-auto py-3 placeholder:h-14 placeholder:text-sm"
        type="search"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <Input
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        className="border-muted placeholder:text-muted-foreground h-auto py-3 placeholder:h-14 placeholder:text-sm"
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
          className={`border-muted h-12! ${
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
        <SelectContent className="bg-background">
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

      {/* Created Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            className={
              "hover:bg-background hover:text-foreground h-auto w-full justify-start"
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
        <PopoverContent className="border-muted p-0" align="start">
          <Calendar
            className="w-full"
            mode="single"
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
            size={"lg"}
            className={
              "hover:bg-background hover:text-foreground h-auto w-full justify-start"
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
        <PopoverContent className="border-muted p-0" align="start">
          <Calendar
            className="w-full"
            mode="single"
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
          className={`border-muted h-12! ${
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
        <SelectContent className="bg-background">
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

export default BookingsFilters;
