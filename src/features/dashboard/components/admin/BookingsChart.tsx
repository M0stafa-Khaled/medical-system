import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetBookingsChart } from "@/features/dashboard/queries";
import AnalyticsChart from "@/shared/components/ChartsCard";
import DateFilter from "@/shared/components/ui/date-filter";
import SelectFilter from "@/shared/components/ui/select-filter";

interface IBookingsFilter {
  booking_start_at: string;
  booking_end_at: string;
  booking_status: string;
}
export const BookingsChart = () => {
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
    <div className="bg-card space-y-5 rounded-xl px-3 py-6 shadow-md md:p-6">
      <h2 className="text-center font-semibold md:text-start md:text-lg">
        إحصائيات الحجوزات
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
        <DateFilter
          value={filters.booking_start_at}
          handleFilterChange={handleFilterChange}
          filterKey="booking_start_at"
          placeholder="من"
        />
        <DateFilter
          value={filters.booking_end_at}
          handleFilterChange={handleFilterChange}
          filterKey="booking_end_at"
          placeholder="إلي"
        />

        <SelectFilter
          value={filters.booking_status}
          filterKey="booking_status"
          placeholder="الحالة"
          handleFilterChange={handleFilterChange}
          options={[
            {
              value: "all",
              label: "الكل",
            },
            {
              value: "pending",
              label: "قيد الانتظار",
            },
            {
              value: "completed",
              label: "مكتمل",
            },
            {
              value: "collected",
              label: "تم التحصيل",
            },
            {
              value: "cancelled",
              label: "ملغي",
            },
            {
              value: "no-show",
              label: "لم يحضر",
            },
            {
              value: "ended",
              label: "منتهي",
            },
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
