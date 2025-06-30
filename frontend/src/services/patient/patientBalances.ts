import axiosAPI from "@/config/axios.config";
import { IPatientBalancesRes } from "@/interfaces/patientBalances";

export const getPatientTransactionsBalances = async (
  token: string
): Promise<IPatientBalancesRes> => {
  const { data } = await axiosAPI.get("/balances", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
