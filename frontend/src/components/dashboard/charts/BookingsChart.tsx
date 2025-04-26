import cookieServices from "@/utils/cookieServices";
import AnalyticsChart from "./AnalyticsChart";
import { useGetBookingsChart } from "@/lib/react-query/charts/adminCharts";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ChartDate from "./ChartDate";

interface IRegistrationFilter {
  booking_start_at: string;
  booking_end_at: string;
}
const BookingsChart = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      booking_start_at: searchParams.get("booking_start_at") || "",
      booking_end_at: searchParams.get("booking_end_at") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetBookingsChart({
    token,
    filter: {
      ...(filters.booking_start_at && { start_at: filters.booking_start_at }),
      ...(filters.booking_end_at && { end_at: filters.booking_end_at }),
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

    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  return (
    <div className="space-y-5 bg-[#fff] dark:bg-dark py-6 px-3 md:p-6 rounded-xl shadow-md">
      <h2 className="text-dark dark:text-white font-bold text-center md:text-start md:text-xl">
        إحصائيات الحجوزات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 lg:gap-x-14">
        <ChartDate
          value={filters.booking_start_at}
          onChange={(date) => handleFilterChange("booking_start_at", date)}
          placeholder="من"
        />
        <ChartDate
          value={filters.booking_end_at}
          onChange={(date) => handleFilterChange("booking_start_at", date)}
          placeholder="إلي"
        />
      </div>
      <AnalyticsChart
        title="الحجوزات"
        datasets={analyticsData?.data.datasets || []}
        labels={analyticsData?.data.labels || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BookingsChart;
