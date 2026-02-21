import { IGetWithParams } from "@/shared/types";
import { IDrugsResponse } from "./types";
import axiosAPI from "@/shared/lib/axios";

export const getAllDrugs = async ({
  page = 1,
  search,
}: IGetWithParams): Promise<IDrugsResponse> =>
  (
    await axiosAPI.get("/drugs", {
      params: { ...(search ? { q: search, page } : { page }) },
    })
  ).data;
