import axiosAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/shared/types";
import {
  IConvertTreasuries,
  ICreateTreasury,
  ITreasuriesRes,
  IUpdateTreasury,
} from "./types";

export const getAllTreasuries = async ({
  search,
}: IGetWithParams): Promise<ITreasuriesRes> =>
  (
    await axiosAPI.get("/treasuries", {
      params: { ...(search && { q: search }) },
    })
  ).data;

export const createTreasury = async ({
  name,
  status,
}: ICreateTreasury): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/treasuries", {
      name,
      status,
    })
  ).data;

export const updateTreasury = async ({
  id,
  name,
  status,
}: IUpdateTreasury): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`treasuries/${id}`, {
      name,
      status: status ? 1 : 0,
      _method: "put",
    })
  ).data;

export const transferTreasuries = async ({
  from_treasury,
  to_treasury,
  amount,
}: IConvertTreasuries): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/convert-treasuries", {
      from_treasury,
      to_treasury,
      amount,
    })
  ).data;

export const deleteTreasury = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/treasuries/${id}`)).data;
