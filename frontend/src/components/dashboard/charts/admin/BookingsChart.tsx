import cookieServices from "@/utils/cookieServices";
import AnalyticsChart from "../../../shared/charts/ChartsCard";
import { useGetBookingsChart } from "@/lib/react-query/dashboard/charts/adminCharts";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ChartDate from "../../../shared/charts/ChartDate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IBookingsFilter {
  booking_start_at: string;
  booking_end_at: string;
  booking_status: string;
}
const BookingsChart = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IBookingsFilter = useMemo(
    () => ({
      booking_start_at: searchParams.get("booking_start_at") || "",
      booking_end_at: searchParams.get("booking_end_at") || "",
      booking_status: searchParams.get("booking_status") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetBookingsChart({
    token,
    filter: {
      ...(filters.booking_start_at && { start_at: filters.booking_start_at }),
      ...(filters.booking_end_at && { end_at: filters.booking_end_at }),
      ...(filters.booking_status && { status: filters.booking_status }),
    },
  });

  const setFilters = (newFilters: IBookingsFilter) => {
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
      <h2 className="text-dark dark:text-white font-semibold text-center md:text-start md:text-lg">
        إحصائيات الحجوزات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 lg:gap-x-10">
        <ChartDate
          value={filters.booking_start_at}
          onChange={(date) => handleFilterChange("booking_start_at", date)}
          placeholder="من"
        />
        <ChartDate
          value={filters.booking_end_at}
          onChange={(date) => handleFilterChange("booking_end_at", date)}
          placeholder="إلي"
        />
        <Select
          value={filters.booking_status}
          onValueChange={(value) =>
            handleFilterChange("booking_status", value === "all" ? "" : value)
          }
          dir="rtl"
        >
          <SelectTrigger
            className={`border-black/20 dark:border-white/40 !h-11 bg-primary text-primary-foreground data-[placeholder]:text-primary-foreground`}
          >
            <SelectValue
              placeholder="الحالة"
              className={`py-4 text-muted-foreground`}
            />
          </SelectTrigger>
          <SelectContent className="text-primary dark:text-primary-foreground bg-primary-foreground dark:bg-primary border-black/20 dark:border-white/40">
            <SelectItem value="all" className="py-2.5 cursor-pointer">
              الكل
            </SelectItem>
            <SelectItem value="pending" className="py-2.5 cursor-pointer">
              قيد الانتظار
            </SelectItem>
            <SelectItem value="completed" className="py-2.5 cursor-pointer">
              مكتمل
            </SelectItem>
            <SelectItem value="collected" className="py-2.5 cursor-pointer">
              تم التحصيل
            </SelectItem>
            <SelectItem value="cancelled" className="py-2.5 cursor-pointer">
              ملغي
            </SelectItem>
            <SelectItem value="no-show" className="py-2.5 cursor-pointer">
              لم يحضر
            </SelectItem>
            <SelectItem value="ended" className="py-2.5 cursor-pointer">
              منتهى
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <AnalyticsChart
        datasets={analyticsData?.data.datasets || []}
        labels={analyticsData?.data.labels || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BookingsChart;
