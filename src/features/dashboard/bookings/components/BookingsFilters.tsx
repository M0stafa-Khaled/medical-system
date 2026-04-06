import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { IBookingsFilter } from "../types";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
          <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            تصفية النتائج
          </h3>
          <Button
            onClick={() => setSearchParams({})}
            size="default"
            variant="outline"
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">مسح الفلاتر</span>
            <span className="sm:hidden">مسح</span>
          </Button>
        </div>
      </div>

      {/* Filters Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InputFilter
          placeholder="بحث بالمريض أو الهاتف"
          value={filters.patient}
          onChange={(e) => handleFilterChange("patient", e.target.value)}
        />

        {/* Clinic */}
        <SelectFilter
          handleFilterChange={handleFilterChange}
          value={filters.clinic}
          placeholder="العيادة"
          filterKey="clinic"
          options={[
            {
              value: "all",
              label: "جميع العيادات",
            },
            ...(clinics?.data.length
              ? clinics.data.map((clinic) => ({
                  label: clinic.name,
                  value: clinic.name.trim(),
                }))
              : []),
          ]}
        />

        {/* Booking Date */}
        <DateFilter
          placeholder="تاريخ الحجز"
          handleFilterChange={handleFilterChange}
          value={filters.booking_date}
          filterKey="booking_date"
        />

        {/* Status */}
        <SelectFilter
          value={filters.status}
          filterKey="status"
          placeholder="حالة الحجز"
          handleFilterChange={handleFilterChange}
          options={[
            {
              value: "all",
              label: "جميع الحالات",
            },
            {
              value: "pending",
              label: "قيد الانتظار",
            },
            {
              value: "completed",
              label: "مكتمل",
            },
            {
              value: "collected",
              label: "تم التحصيل",
            },
            {
              value: "cancelled",
              label: "ملغي",
            },
            {
              value: "no-show",
              label: "لم يحضر",
            },
            {
              value: "ended",
              label: "منتهي",
            },
          ]}
        />
      </div>
    </motion.div>
  );
};

export default BookingsFilters;
