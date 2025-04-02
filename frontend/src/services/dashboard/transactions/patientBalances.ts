import axiosInstanceAPI from "@/config/axios.config";
import {
  ICreatePatientPayment,
  IPatientBalancesRes,
} from "@/interfaces/dashboard/transactions/patientBalances";

export const getPatientBalances = async ({
  token,
  patientId,
}: {
  token: string;
  patientId: string;
}): Promise<IPatientBalancesRes> => {
  const { data } = await axiosInstanceAPI.get(
    `/transactions/${patientId}/balances`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const createPatientPayment = async ({
  token,
  patientId,
  transaction,
}: ICreatePatientPayment): Promise<{
  status: boolean;
  message: string;
}> => {
  const { data } = await axiosInstanceAPI.post(
    `/transactions/${patientId}/balances/payment`,
    transaction,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
