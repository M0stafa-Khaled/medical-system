import axiosAPI from "@/shared/lib/axios";
import { IDailySummaryRes } from "./types";

export const getDailySummary = async ({
  date,
}: {
  date?: string;
}): Promise<IDailySummaryRes> =>
  (
    await axiosAPI.get("/system/info", {
      params: { ...(date && { date }) },
    })
  ).data;
