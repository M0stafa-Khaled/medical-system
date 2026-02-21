import cookieServices from "@/shared/utils/cookieServices";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useGetTreasuriesChart } from "@/features/dashboard/queries";
import ChartDate from "@/shared/components/ChartDate";
import AnalyticsChart from "@/shared/components/ChartsCard";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
  treasury: string;
}
export const TreasuriesChart = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: treasuries } = useGetAllTreasuries({ token });

  const filters: ITreasuriesFilter = useMemo(
    () => ({
      treasury_start_at: searchParams.get("treasury_start_at") || "",
      treasury_end_at: searchParams.get("treasury_end_at") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const { data: analyticsData, isLoading } = useGetTreasuriesChart({
    token,
    filter: {
      ...(filters.treasury_start_at && { start_at: filters.treasury_start_at }),
      ...(filters.treasury_end_at && { end_at: filters.treasury_end_at }),
      ...(filters.treasury && { treasury: filters.treasury }),
    },
  });

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
    <div className="bg-card space-y-5 rounded-xl px-3 py-6 shadow-md md:p-6">
      <h2 className="text-center font-semibold md:text-start md:text-lg">
        إحصائيات الخزائن
      </h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
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
        <Select
          value={filters.treasury}
          onValueChange={(value) =>
            handleFilterChange("treasury", value === "all" ? "" : value)
          }
          dir="rtl"
        >
          <SelectTrigger
            className={`h-11! border-black/20 dark:border-white/40`}
          >
            <SelectValue placeholder="الخزينة" className={`py-4 text-white`} />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all" className="cursor-pointer py-2.5">
              الكل
            </SelectItem>
            {treasuries?.data.map((treasury) => (
              <SelectItem
                key={treasury.id}
                value={treasury.name}
                className="cursor-pointer py-2.5"
              >
                {treasury.name}
              </SelectItem>
            ))}
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
