import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { IPrescriptionsReportFilter } from "../../types";
import InputFilter from "@/shared/components/ui/input-filter";
import DateFilter from "@/shared/components/ui/date-filter";

export const PrescriptionsReportFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: IPrescriptionsReportFilter = useMemo(
    () => ({
      clinic: searchParams.get("clinic") || "",
      date: searchParams.get("date") || "",
      doctor: searchParams.get("doctor") || "",
      end_at: searchParams.get("end_at") || "",
      patient: searchParams.get("patient") || "",
      start_at: searchParams.get("start_at") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IPrescriptionsReportFilter) => {
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
        placeholder="ابحث باسم المريض"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />
      <InputFilter
        placeholder="ابحث باسم الطبيب"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />
      <InputFilter
        placeholder="ابحث باسم العيادة"
        value={filters.clinic}
        onChange={(e) => handleFilterChange("clinic", e.target.value)}
      />
      <DateFilter
        filterKey="date"
        handleFilterChange={handleFilterChange}
        value={filters.date}
        placeholder="التاريخ"
      />
      <DateFilter
        filterKey="start_at"
        handleFilterChange={handleFilterChange}
        value={filters.start_at}
        placeholder="من"
      />
      <DateFilter
        filterKey="end_at"
        handleFilterChange={handleFilterChange}
        value={filters.end_at}
        placeholder="إلى"
      />
    </div>
  );
};
