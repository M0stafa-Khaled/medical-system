import axiosAPI from "@/shared/lib/axios";
import { IPatientBalancesRes } from "@/features/dashboard/patients/balances/types";

export const getPatientTransactionsBalances =
  async (): Promise<IPatientBalancesRes> => {
    const { data } = await axiosAPI.get("/balances", {});
    return data;
  };
