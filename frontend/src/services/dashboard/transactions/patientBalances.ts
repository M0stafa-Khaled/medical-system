import axiosAPI from "@/config/axios.config";
import {
  ICreatePatientPayment,
  IPatientBalancesRes,
} from "@/interfaces/patientBalances";

export const getPatientBalances = async ({
  token,
  patientId,
}: {
  token: string;
  patientId: string;
}): Promise<IPatientBalancesRes> => {
  const { data } = await axiosAPI.get(`/transactions/${patientId}/balances`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const { data } = await axiosAPI.post(
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
