import axiosAPI from "@/shared/lib/axios";
import { IPatientBalancesRes } from "./types";

export const getPatientBalances = async (): Promise<IPatientBalancesRes> =>
  (await axiosAPI.get("/balances")).data;
