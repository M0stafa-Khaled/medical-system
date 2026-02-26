import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetRegistrationChart } from "@/features/dashboard/queries";
import DateFilter from "@/shared/components/ui/date-filter";
import AnalyticsChart from "@/shared/components/ChartsCard";

interface IRegistrationFilter {
  register_start_at: string;
  register_end_at: string;
}
export const RegistrationChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IRegistrationFilter = useMemo(
    () => ({
      register_start_at: searchParams.get("register_start_at") || "",
      register_end_at: searchParams.get("register_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetRegistrationChart({
    filter: {
      ...(filters.register_start_at && { start_at: filters.register_start_at }),
      ...(filters.register_end_at && { end_at: filters.register_end_at }),
    },
  });

  const setFilters = (newFilters: IRegistrationFilter) => {
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
        إحصائيات المستخدمين الجدد
      </h2>
      <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <DateFilter
          value={filters.register_start_at}
          placeholder="من"
          handleFilterChange={handleFilterChange}
          filterKey="register_start_at"
        />
        <DateFilter
          value={filters.register_end_at}
          placeholder="إلي"
          handleFilterChange={handleFilterChange}
          filterKey="register_end_at"
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
