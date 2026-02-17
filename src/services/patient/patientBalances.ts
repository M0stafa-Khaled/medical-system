import axiosAPI from "@/config/axios.config";
import { IPatientBalancesRes } from "@/features/dashboard/patients/balances/types";

export const getPatientTransactionsBalances = async (
  token: string
): Promise<IPatientBalancesRes> => {
  const { data } = await axiosAPI.get("/balances", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
