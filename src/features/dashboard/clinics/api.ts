import axiosAPI from "@/config/axios.config";
import type { IStatusMsg, IGetWithParams } from "@/shared/types";
import type { ICreateClinic, IClinicsRes, IUpdateClinic } from "./types";

export const getAllClinics = async ({
  filter,
}: IGetWithParams): Promise<IClinicsRes> =>
  (
    await axiosAPI.get("/clinics", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const createClinic = async ({
  name,
  status,
  virtual_number,
}: ICreateClinic): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/clinics", {
      name,
      status: status ? "1" : "0",
      virtual_number,
    })
  ).data;
export const deleteClinic = async ({
  id,
}: {
  id: number;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/clinics/${id}`)).data;

export const updateClinic = async ({
  id,
  name,
  status,

  virtual_number,
}: IUpdateClinic): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/clinics/${id}`, {
      name,
      status: status ? "1" : "0",
      virtual_number,
      _method: "put",
    })
  ).data;
