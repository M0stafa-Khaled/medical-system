import cookieServices from "@/shared/utils/cookieServices";
import AnalyticsChart from "../../shared/charts/ChartsCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import ChartDate from "../../shared/charts/ChartDate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useGetDoctorBookingsChart } from "@/shared/lib/react-query/doctor/doctorCharts";

interface IBookingsFilter {
  booking_start_at: string;
  booking_end_at: string;
  booking_status: string;
}
const DoctorBookingsCharts = () => {
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

  const { data: analyticsData, isLoading } = useGetDoctorBookingsChart({
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
    <div className="dark:bg-dark space-y-5 rounded-xl bg-[#fff] px-3 py-6 shadow-md md:p-6">
      <h2 className="text-dark text-center font-semibold md:text-start md:text-lg dark:text-white">
        إحصائيات الحجوزات
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
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
            className={`bg-primary text-primary-foreground data-placeholder:text-primary-foreground h-11! border-black/20 dark:border-white/40`}
          >
            <SelectValue
              placeholder="الحالة"
              className={`text-muted-foreground py-4`}
            />
          </SelectTrigger>
          <SelectContent className="text-primary dark:text-primary-foreground bg-primary-foreground dark:bg-primary border-black/20 dark:border-white/40">
            <SelectItem value="all" className="cursor-pointer py-2.5">
              الكل
            </SelectItem>

            <SelectItem value="collected" className="cursor-pointer py-2.5">
              تم التحصيل
            </SelectItem>

            <SelectItem value="completed" className="cursor-pointer py-2.5">
              مكتمل
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

export default DoctorBookingsCharts;
