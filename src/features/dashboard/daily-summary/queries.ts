import { useQuery } from "@tanstack/react-query";
import { getDailySummary } from "./api";

export const useGetDailySummary = (date?: string) =>
  useQuery({
    queryKey: ["daily-summary", date],
    queryFn: () => getDailySummary({ date }),
  });
