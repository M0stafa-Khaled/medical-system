import cookieServices from "@/shared/utils/cookieServices";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries";
import { useGetTreasuriesChart } from "@/features/dashboard/queries";
import AnalyticsChart from "@/shared/components/ChartsCard";
import DateFilter from "@/shared/components/ui/date-filter";
import SelectFilter from "@/shared/components/ui/select-filter";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
  treasury: string;
}
export const TreasuriesChart = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: treasuries } = useGetAllTreasuries({ token });

  const filters: ITreasuriesFilter = useMemo(
    () => ({
      treasury_start_at: searchParams.get("treasury_start_at") || "",
      treasury_end_at: searchParams.get("treasury_end_at") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetTreasuriesChart({
    token,
    filter: {
      ...(filters.treasury_start_at && { start_at: filters.treasury_start_at }),
      ...(filters.treasury_end_at && { end_at: filters.treasury_end_at }),
      ...(filters.treasury && { treasury: filters.treasury }),
    },
  });

  const setFilters = (newFilters: ITreasuriesFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="bg-card space-y-5 rounded-xl px-3 py-6 shadow-md md:p-6">
      <h2 className="text-center font-semibold md:text-start md:text-lg">
        إحصائيات الخزائن
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
        <DateFilter
          value={filters.treasury_start_at}
          handleFilterChange={handleFilterChange}
          filterKey="treasury_start_at"
          placeholder="من"
        />
        <DateFilter
          value={filters.treasury_end_at}
          handleFilterChange={handleFilterChange}
          filterKey="treasury_end_at"
          placeholder="إلي"
        />

        <SelectFilter
          placeholder="الخزنة"
          handleFilterChange={handleFilterChange}
          value={filters.treasury}
          filterKey="treasury"
          options={[
            { value: "all", label: "الكل" },
            ...(treasuries?.data.length
              ? treasuries.data.map((t) => ({
                  value: t.name.trim(),
                  label: t.name,
                }))
              : []),
          ]}
        />
      </div>
      <AnalyticsChart
        datasets={analyticsData?.data.datasets || []}
        labels={analyticsData?.data.labels || []}
        isLoading={isLoading}
      />
    </div>
  );
};
