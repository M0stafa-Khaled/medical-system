import axiosAPI from "@/shared/lib/axios";
import { ICreatePatientPayment, IPatientBalancesRes } from "./types";

export const getPatientBalances = async ({
  patientId,
}: {
  patientId: string;
}): Promise<IPatientBalancesRes> =>
  (await axiosAPI.get(`/transactions/${patientId}/balances`)).data;

export const createPatientPayment = async ({
  patientId,
  transaction,
}: ICreatePatientPayment): Promise<{
  status: boolean;
  message: string;
}> =>
  (
    await axiosAPI.post(
      `/transactions/${patientId}/balances/payment`,
      transaction
    )
  ).data;
