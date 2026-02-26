import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetEmployeeTreasuriesChart } from "@/features/dashboard/queries";
import { AxiosResErr } from "@/shared/types";
import DataLoader from "@/shared/components/ui/DataLoader";
import ChartDate from "@/shared/components/ChartDate";
import AnalyticsChart from "@/shared/components/ChartsCard";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
}

export const EmployeeTreasuriesChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITreasuriesFilter = useMemo(
    () => ({
      treasury_start_at: searchParams.get("treasury_start_at") || "",
      treasury_end_at: searchParams.get("treasury_end_at") || "",
    }),
    [searchParams]
  );

  const {
    data: analyticsData,
    isLoading,
    failureReason,
  } = useGetEmployeeTreasuriesChart({
    filter: {
      ...(filters.treasury_start_at && { start_at: filters.treasury_start_at }),
      ...(filters.treasury_end_at && { end_at: filters.treasury_end_at }),
    },
  });
  const analyticsFailure = failureReason as AxiosResErr;

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
    <div className="dark:bg-dark space-y-5 rounded-xl bg-white px-3 py-6 shadow-md md:p-6">
      <h2 className="text-dark md:text-=lg text-center font-semibold md:text-start dark:text-white">
        إحصائيات الخزينة
      </h2>
      {isLoading ? (
        <div className="flex h-48 w-full items-center justify-center">
          <DataLoader />
        </div>
      ) : !analyticsData?.status ? (
        <div className="flex h-48 w-full items-center justify-center">
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            {analyticsFailure?.response?.data.message ||
              "لا توجد بيانات متاحة في الوقت الحالي"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:gap-x-10">
            <ChartDate
              value={filters.treasury_start_at}
              onChange={(date) => handleFilterChange("treasury_start_at", date)}
              placeholder="من"
            />
            <ChartDate
              value={filters.treasury_end_at}
              onChange={(date) => handleFilterChange("treasury_end_at", date)}
              placeholder="إلي"
            />
          </div>
          <AnalyticsChart
            datasets={analyticsData?.data.datasets || []}
            labels={analyticsData?.data.labels || []}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
