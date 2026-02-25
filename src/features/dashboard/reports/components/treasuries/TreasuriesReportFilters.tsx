import InputFilter from "@/shared/components/ui/input-filter";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";
import { ITreasuriesReportFilter } from "../../types";

export const TreasuriesReportFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITreasuriesReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      type: searchParams.get("type") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: ITreasuriesReportFilter) => {
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
        placeholder="ابحث باسم الخزينة"
        value={filters.treasury}
        onChange={(e) => handleFilterChange("treasury", e.target.value)}
      />
      {/* Status */}

      <SelectFilter
        placeholder="الحالة"
        filterKey="type"
        handleFilterChange={handleFilterChange}
        value={filters.type}
        options={[
          {
            value: "all",
            label: "الكل",
          },
          {
            value: "transfers",
            label: "تحويلات خزائن",
          },
          {
            value: "transactions",
            label: "ايرادات",
          },
          {
            value: "expenses",
            label: "مصروفات",
          },
        ]}
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
        placeholder="الى"
      />
    </div>
  );
};
