import axiosAPI from "@/shared/lib/axios";
import { IGetWithParams } from "@/shared/types";
import {
  ICreateTransaction,
  ITransaction,
  ITransactionsRes,
  IRefundTransaction,
  IPatientLastVisits,
  IPatientBalancesTransactionsRes,
} from "./types";

export const getAllTransactions = async ({
  page,
  filter,
  sort,
}: IGetWithParams): Promise<ITransactionsRes> =>
  (
    await axiosAPI.get("/transactions", {
      params: { page, sort, ...(filter && { filter }) },
    })
  ).data;

export const getTransactionById = async ({
  id,
}: {
  id: string;
}): Promise<{
  status: boolean;
  message: string;
  data: ITransaction;
}> => (await axiosAPI.get(`/transactions/${id}`)).data;

export const createTransaction = async (
  values: ICreateTransaction
): Promise<{
  message: string;
  status: boolean;
}> => {
  const formData = new FormData();
  formData.append("booking_id", values.booking_id);
  formData.append("payment_method", values.payment_method);
  if (values.card_number) formData.append("card_number", values.card_number);
  formData.append("contract_type", values.contract_type);
  formData.append("price", values.price.toString());
  values.doctor_actions.map((action, idx) =>
    formData.append(`doctor_actions[${idx}]`, action)
  );
  const { data } = await axiosAPI.post("/transactions", formData);
  return data;
};

export const refundTransaction = async ({
  id,
  refund_info,
}: IRefundTransaction): Promise<{
  status: boolean;
  message: string;
}> =>
  (
    await axiosAPI.post(`/transactions/${id}/refund`, {
      refund_info,
    })
  ).data;

export const getPatientLastVisits = async ({
  doctorId,
  patientId,
}: {
  doctorId: string;
  patientId: string;
}): Promise<IPatientLastVisits> =>
  await axiosAPI.get(`/${patientId}/transactions/${doctorId}`);

export const getAllPatientBalancesTransactions = async ({
  patientId,
  search,
}: {
  patientId: string;
  search: string;
}): Promise<IPatientBalancesTransactionsRes> =>
  (
    await axiosAPI.get(`/${patientId}/balances`, {
      params: { ...(search ? { code: search } : {}) },
    })
  ).data;
