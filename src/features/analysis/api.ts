import { IGetWithParams } from "@/shared/types";
import { IAnalysisRes } from "./types";
import axiosAPI from "@/shared/lib/axios";

export const getAllAnalysis = async ({
  page,
  search,
}: IGetWithParams): Promise<IAnalysisRes> =>
  (
    await axiosAPI.get("/analysis", {
      params: { ...(search ? { q: search, page } : { page }) },
    })
  ).data;
