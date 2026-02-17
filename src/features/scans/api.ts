import { IGetWithParams } from "@/shared/types";
import { IScansRes } from "./types";
import axiosAPI from "@/config/axios.config";

export const getAllScans = async ({
  page,
  search,
}: IGetWithParams): Promise<IScansRes> =>
  (
    await axiosAPI.get("/scans", {
      params: { ...(search ? { q: search, page } : { page }) },
    })
  ).data;
