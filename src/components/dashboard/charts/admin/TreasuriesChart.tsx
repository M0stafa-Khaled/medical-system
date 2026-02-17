import cookieServices from "@/shared/utils/cookieServices";
import AnalyticsChart from "../../../shared/charts/ChartsCard";
import { useGetTreasuriesChart } from "@/shared/lib/react-query/dashboard/charts/adminCharts";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import ChartDate from "../../../shared/charts/ChartDate";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

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
    <div className="dark:bg-dark space-y-5 rounded-xl bg-white px-3 py-6 shadow-md md:p-6">
      <h2 className="text-dark text-center font-semibold md:text-start md:text-lg dark:text-white">
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
            className={`bg-primary text-primary-foreground data-placeholder:text-primary-foreground h-11! border-black/20 dark:border-white/40`}
          >
            <SelectValue placeholder="الخزينة" className={`py-4 text-white`} />
          </SelectTrigger>
          <SelectContent className="text-primary dark:text-primary-foreground bg-primary-foreground dark:bg-primary border-black/20 dark:border-white/40">
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

export default TreasuriesChart;
