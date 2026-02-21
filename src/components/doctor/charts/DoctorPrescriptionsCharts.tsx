import cookieServices from "@/shared/utils/cookieServices";
import AnalyticsChart from "../../../shared/components/ChartsCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import ChartDate from "../../../shared/components/ChartDate";
import { useGetDoctorPrescriptionsChart } from "@/shared/lib/react-query/doctor/doctorCharts";

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
    <div className="dark:bg-dark space-y-5 rounded-xl bg-[#fff] px-3 py-6 shadow-md md:p-6">
      <h2 className="text-dark text-center font-semibold md:text-start md:text-lg dark:text-white">
        إحصائيات الروشتات
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:gap-x-10">
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
        datasets={analyticsData?.data.datasets || []}
        labels={analyticsData?.data.labels || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DoctorPrescriptionsCharts;
