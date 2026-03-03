import { ITransaction } from "../transactions/types";

export interface IDoctorTransactions {
  items: ITransaction[];
  commission: string;
  total_amount: number;
}

export interface IDoctorTransactionsRes {
  status: boolean;
  message: string | null;
  data: IDoctorTransactions;
}
