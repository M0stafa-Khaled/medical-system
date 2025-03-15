import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import { IDrugsResponse } from "@/interfaces/dashboard/drugs";

export const getAllMedications: ({
  token,
  page,
  search,
}: IGetWithParams) => Promise<IDrugsResponse> = async ({
  token,
  page = 1,
  search,
}) => {
  const { data } = await axiosInstanceAPI.get("/drugs", {
    params: { ...(search ? { q: search, page } : { page }) },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
