import cookieServices from "@/shared/utils/cookieServices";
import AnalyticsChart from "../../../../components/shared/charts/ChartsCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import ChartDate from "../../../../components/shared/charts/ChartDate";
import { useGetRegistrationChart } from "@/features/dashboard/queries";

interface IRegistrationFilter {
  register_start_at: string;
  register_end_at: string;
}
export const RegistrationChart = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IRegistrationFilter = useMemo(
    () => ({
      register_start_at: searchParams.get("register_start_at") || "",
      register_end_at: searchParams.get("register_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetRegistrationChart({
    token,
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
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:gap-x-10">
        <ChartDate
          value={filters.register_start_at}
          onChange={(date) => handleFilterChange("register_start_at", date)}
          placeholder="من"
        />
        <ChartDate
          value={filters.register_end_at}
          onChange={(date) => handleFilterChange("register_end_at", date)}
          placeholder="إلي"
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
