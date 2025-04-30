import cookieServices from "@/utils/cookieServices";
import AnalyticsChart from "../AnalyticsChart";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ChartDate from "../ChartDate";

import { useGetEmployeeTreasuriesChart } from "@/lib/react-query/charts/employeeCharts";
import { AxiosResErr } from "@/types";
import DataLoader from "@/components/ui/DataLoader";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
}

const EmployeeTreasuriesChart = () => {
  const token = cookieServices.getToken()!;
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
    token,
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
  console.log(analyticsData);
  return (
    <div className="space-y-5 bg-[#fff] dark:bg-dark py-6 px-3 md:p-6 rounded-xl shadow-md">
      <h2 className="text-dark dark:text-white font-bold text-center md:text-start md:text-xl">
        إحصائيات الخزينة
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-48">
          <DataLoader />
        </div>
      ) : !analyticsData?.status ? (
        <div className="flex items-center justify-center w-full h-48">
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            {analyticsFailure?.response?.data.message ||
              "لا توجد بيانات متاحة في الوقت الحالي"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-10">
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
            title={analyticsData.data.treasury_name}
            datasets={analyticsData?.data.datasets || []}
            labels={analyticsData?.data.labels || []}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default EmployeeTreasuriesChart;
