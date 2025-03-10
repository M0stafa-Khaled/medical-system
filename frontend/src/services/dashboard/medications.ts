import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import { IMedicationsResponse } from "@/interfaces/dashboard/medication";

export const getAllMedications: ({
  token,
  page,
  search,
}: IGetWithParams) => Promise<IMedicationsResponse> = async ({
  token,
  page = 1,
  search = "",
}) => {
  const { data } = await axiosInstanceAPI.get("/drugs", {
    params: { ...(search ? { q: search } : { page, q: search }) },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
