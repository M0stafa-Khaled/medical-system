import { useGetAllClinics } from "@/features/dashboard/clinics";
import { IBookingsReportFilter } from "../../types";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

export const BookingsReportFilters = () => {
  const { data: clinics } = useGetAllClinics({});

  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IBookingsReportFilter = useMemo(
    () => ({
      booking_date: searchParams.get("booking_date") || "",
      doctor: searchParams.get("doctor") || "",
      clinic: searchParams.get("clinic") || "",
      patient: searchParams.get("patient") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      status: searchParams.get("status") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IBookingsReportFilter) => {
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
      <InputFilter
        placeholder="ابحث باسم الطبيب"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <InputFilter
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />

      {/* Clinic */}
      <SelectFilter
        filterKey="clinic"
        handleFilterChange={handleFilterChange}
        value={filters.clinic}
        options={[
          {
            value: "all",
            label: "الكل",
          },
          ...(clinics?.data?.length
            ? clinics.data.map((clinic) => ({
                value: clinic.name.trim(),
                label: clinic.name,
              }))
            : []),
        ]}
        placeholder="العيادة"
      />

      {/* Start Date */}
      <DateFilter
        filterKey="start_at"
        handleFilterChange={handleFilterChange}
        value={filters.start_at}
        placeholder="من"
      />

      {/* End Date */}
      <DateFilter
        filterKey="end_at"
        handleFilterChange={handleFilterChange}
        value={filters.end_at}
        placeholder="إلي"
      />

      {/* Booking Date */}
      <DateFilter
        filterKey="booking_date"
        handleFilterChange={handleFilterChange}
        value={filters.booking_date}
        placeholder="تاريخ الحجز"
      />

      {/* Status */}
      <SelectFilter
        filterKey="status"
        handleFilterChange={handleFilterChange}
        value={filters.status}
        placeholder="الحالة"
        options={[
          {
            label: "الكل",
            value: "all",
          },
          {
            label: "قيد الانتظار",
            value: "pending",
          },
          {
            label: "مكتمل",
            value: "completed",
          },
          {
            label: "محصل",
            value: "collected",
          },
          {
            label: "ملغي",
            value: "cancelled",
          },
          {
            label: "لم يحضر",
            value: "no-show",
          },
          {
            label: "منتهي",
            value: "ended",
          },
        ]}
      />
    </div>
  );
};
