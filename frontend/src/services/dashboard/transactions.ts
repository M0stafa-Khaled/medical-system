import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import {
  ICreateTransaction,
  ITransaction,
  ITransactionsRes,
  IRefundTransaction,
} from "@/interfaces/dashboard/transactions";

export const getAllTransactions: ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams) => Promise<ITransactionsRes> = async ({
  token,
  page,
  filter,
  sort,
}) => {
  const { data } = await axiosInstanceAPI.get("/transactions", {
    params: { page, sort, ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getTransactionById: ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => Promise<{
  status: boolean;
  message: string;
  data: ITransaction;
}> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.get(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createTransaction: ({
  formData,
  token,
}: ICreateTransaction) => Promise<{
  message: string;
  status: boolean;
}> = async ({ token, formData }) => {
  const { data } = await axiosInstanceAPI.post("/transactions", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const refundTransaction: ({
  token,
  id,
  refund_info,
}: IRefundTransaction) => Promise<{
  status: boolean;
  message: string;
}> = async ({ token, id, refund_info }) => {
  const { data } = await axiosInstanceAPI.post(
    `/transactions/${id}/refund`,
    { refund_info },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
