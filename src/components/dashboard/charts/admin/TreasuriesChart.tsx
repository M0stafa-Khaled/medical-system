import cookieServices from "@/utils/cookieServices";
import AnalyticsChart from "../../../shared/charts/ChartsCard";
import { useGetTreasuriesChart } from "@/lib/react-query/dashboard/charts/adminCharts";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ChartDate from "../../../shared/charts/ChartDate";
import { useGetAllTreasuries } from "@/lib/react-query/dashboard/treasuries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ITreasuriesFilter {
  treasury_start_at: string;
  treasury_end_at: string;
  treasury: string;
}
const TreasuriesChart = () => {
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
    <div className="space-y-5 bg-[#fff] dark:bg-dark py-6 px-3 md:p-6 rounded-xl shadow-md">
      <h2 className="text-dark dark:text-white font-semibold text-center md:text-start md:text-lg">
        إحصائيات الخزائن
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 lg:gap-x-10">
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
            className={`border-black/20 dark:border-white/40 h-11! bg-primary text-primary-foreground data-placeholder:text-primary-foreground`}
          >
            <SelectValue placeholder="الخزينة" className={`py-4 text-white`} />
          </SelectTrigger>
          <SelectContent className="text-primary dark:text-primary-foreground bg-primary-foreground dark:bg-primary border-black/20 dark:border-white/40">
            <SelectItem value="all" className="py-2.5 cursor-pointer">
              الكل
            </SelectItem>
            {treasuries?.data.map((treasury) => (
              <SelectItem
                key={treasury.id}
                value={treasury.name}
                className="py-2.5 cursor-pointer"
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

export default TreasuriesChart;
