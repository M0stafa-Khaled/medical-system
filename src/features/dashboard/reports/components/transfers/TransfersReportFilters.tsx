import { ITransfersReportFilter } from "@/features/dashboard/reports/types";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import InputFilter from "@/shared/components/ui/input-filter";
import DateFilter from "@/shared/components/ui/date-filter";

export const TransfersFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITransfersReportFilter = useMemo(
    () => ({
      employee: searchParams.get("employee") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      from_treasury: searchParams.get("from_treasury") || "",
      to_treasury: searchParams.get("to_treasury") || "",
    }),
    [searchParams]
  );
  const setFilters = (newFilters: ITransfersReportFilter) => {
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
        placeholder="ابحث باسم الموظف"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      <InputFilter
        placeholder="اسم الخزينة المحول منها"
        value={filters.from_treasury}
        onChange={(e) => handleFilterChange("from_treasury", e.target.value)}
      />

      <InputFilter
        placeholder="اسم الخزينة المحول إليها"
        value={filters.to_treasury}
        onChange={(e) => handleFilterChange("to_treasury", e.target.value)}
      />

      {/* Start Date */}
      <DateFilter
        placeholder="من"
        handleFilterChange={handleFilterChange}
        filterKey="start_at"
        value={filters.start_at}
      />

      {/* End Date */}
      <DateFilter
        placeholder="إلي"
        handleFilterChange={handleFilterChange}
        filterKey="end_at"
        value={filters.end_at}
      />
    </div>
  );
};
