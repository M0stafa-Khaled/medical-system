import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  ICreateDosage,
  IDosagesRes,
  IUpdateDosage,
} from "@/interfaces/dashboard/dosages";

export const getAllDosages = async ({
  token,
  search,
}: IGetWithParams): Promise<IDosagesRes> => {
  const { data } = await axiosInstanceAPI.get("/dosages", {
    params: { ...(search && { q: search }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createDosage = async ({
  token,
  name,
}: ICreateDosage): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    "/dosages",
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const updateDosage = async ({
  token,
  name,
  id,
}: IUpdateDosage): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    `dosages/${id}`,
    { name, _method: "put" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const deleteDosage = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(`dosages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
