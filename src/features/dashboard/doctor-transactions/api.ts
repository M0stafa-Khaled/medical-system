import { IStatusMsg } from "@/shared/types";
import { IDoctorTransactionsRes } from "./types";
import axiosAPI from "@/shared/lib/axios";

export const getDoctorTransactions = async ({
  id,
}: {
  id: string;
}): Promise<IDoctorTransactionsRes> =>
  (await axiosAPI.get(`/${id}/transactions`)).data;

export const createDoctorTransaction = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.post(`/${id}/transactions/add-expense`)).data;
