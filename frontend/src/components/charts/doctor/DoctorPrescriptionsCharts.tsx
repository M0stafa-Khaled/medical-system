import cookieServices from "@/utils/cookieServices";
import AnalyticsChart from "../AnalyticsChart";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ChartDate from "../ChartDate";
import { useGetDoctorPrescriptionsChart } from "@/lib/react-query/charts/doctorCharts";

interface ITransactionsFilter {
  prescription_start_at: string;
  prescription_end_at: string;
}
const DoctorPrescriptionsCharts = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITransactionsFilter = useMemo(
    () => ({
      prescription_start_at: searchParams.get("prescription_start_at") || "",
      prescription_end_at: searchParams.get("prescription_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetDoctorPrescriptionsChart({
    token,
    filter: {
      ...(filters.prescription_start_at && {
        start_at: filters.prescription_start_at,
      }),
      ...(filters.prescription_end_at && {
        end_at: filters.prescription_end_at,
      }),
    },
  });

  const setFilters = (newFilters: ITransactionsFilter) => {
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
    <div className="space-y-5 bg-[#fff] dark:bg-dark py-6 px-3 md:p-6 rounded-xl shadow-md">
      <h2 className="text-dark dark:text-white font-bold text-center md:text-start md:text-xl">
        إحصائيات الروشتات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-10">
        <ChartDate
          value={filters.prescription_start_at}
          onChange={(date) => handleFilterChange("prescription_start_at", date)}
          placeholder="من"
        />
        <ChartDate
          value={filters.prescription_end_at}
          onChange={(date) => handleFilterChange("prescription_end_at", date)}
          placeholder="إلي"
        />
      </div>
      <AnalyticsChart
        title="الروشتات"
        datasets={analyticsData?.data.datasets || []}
        labels={analyticsData?.data.labels || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorPrescriptionsCharts;
