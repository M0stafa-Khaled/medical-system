import { useMemo } from "react";
import { useSearchParams } from "react-router";
import InputFilter from "@/shared/components/ui/input-filter";
import DateFilter from "@/shared/components/ui/date-filter";
import { IPatientsReportFilter } from "../../types";

export const PatientsReportFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IPatientsReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      q: searchParams.get("q") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IPatientsReportFilter) => {
    const params = new URLSearchParams(searchParams);

    // update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <InputFilter
        placeholder="ابحث باسم المريض او رقم الهاتف"
        value={filters.q}
        onChange={(e) => handleFilterChange("q", e.target.value)}
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
    </div>
  );
};
