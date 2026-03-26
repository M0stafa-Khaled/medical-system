import axiosAPI from "@/shared/lib/axios";
import { IDailySummaryRes } from "./types";

export const getDailySummary = async ({
  date,
}: {
  date?: string;
}): Promise<IDailySummaryRes> =>
  (
    await axiosAPI.get("/systeme/info", {
      params: { ...(date && { date }) },
    })
  ).data;
