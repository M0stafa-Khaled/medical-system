import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { IBookingsFilter } from "../types";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

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
      {/* <InputFilter
        placeholder="ابحث باسم الطبيب"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      /> */}
      <InputFilter
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
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
            label: "الكل",
          },
          ...(clinics?.data.length
            ? clinics.data.map((clinic) => ({
                label: clinic.name,
                value: clinic.name.trim(),
              }))
            : []),
        ]}
      />

      {/* Created Date */}
      {/* <DateFilter
        placeholder="تاريخ الإنشاء"
        filterKey="created_at"
        handleFilterChange={handleFilterChange}
        value={filters.created_at}
      /> */}

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
        placeholder="الحالة"
        handleFilterChange={handleFilterChange}
        options={[
          {
            value: "all",
            label: "الكل",
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
  );
};

export default BookingsFilters;
