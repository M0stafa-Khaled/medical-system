import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import { ICreateDosage, IDosagesRes, IUpdateDosage } from "./types";

export const getAllDosages = async ({
  search,
}: IGetWithParams): Promise<IDosagesRes> =>
  (
    await axiosAPI.get("/dosages", {
      params: { ...(search && { q: search }) },
    })
  ).data;

export const createDosage = async ({
  name,
}: ICreateDosage): Promise<IStatusMsg> =>
  (await axiosAPI.post("/dosages", { name })).data;

export const updateDosage = async ({
  name,
  id,
}: IUpdateDosage): Promise<IStatusMsg> =>
  (await axiosAPI.post(`dosages/${id}`, { name, _method: "put" })).data;

export const deleteDosage = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`dosages/${id}`)).data;
