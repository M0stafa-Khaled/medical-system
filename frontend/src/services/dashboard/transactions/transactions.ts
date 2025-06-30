import axiosAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import {
  ICreateTransaction,
  ITransaction,
  ITransactionsRes,
  IRefundTransaction,
  IPatientLastVisits,
} from "@/interfaces/dashboard/transactions/transactions";

export const getAllTransactions = async ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams): Promise<ITransactionsRes> => {
  const { data } = await axiosAPI.get("/transactions", {
    params: { page, sort, ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getTransactionById = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<{
  status: boolean;
  message: string;
  data: ITransaction;
}> => {
  const { data } = await axiosAPI.get(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createTransaction = async ({
  token,
  dataForm,
}: ICreateTransaction): Promise<{
  message: string;
  status: boolean;
}> => {
  const formData = new FormData();
  formData.append("booking_id", dataForm.booking_id);
  formData.append("payment_method", dataForm.payment_method);
  if (dataForm.card_number)
    formData.append("card_number", dataForm.card_number);
  formData.append("contract_type", dataForm.contract_type);
  formData.append("price", dataForm.price.toString());
  dataForm.doctor_actions.map((action, idx) =>
    formData.append(`doctor_actions[${idx}]`, action)
  );
  const { data } = await axiosAPI.post("/transactions", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const refundTransaction = async ({
  token,
  id,
  refund_info,
}: IRefundTransaction): Promise<{
  status: boolean;
  message: string;
}> => {
  const { data } = await axiosAPI.post(
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

export const getPatientLastVisits = async ({
  token,
  doctorId,
  patientId,
}: {
  token: string;
  doctorId: string;
  patientId: string;
}): Promise<IPatientLastVisits> => {
  const { data } = await axiosAPI.get(
    `/${patientId}/transactions/${doctorId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
