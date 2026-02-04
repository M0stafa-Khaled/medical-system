import { ITransaction } from "../transactions/transactions";

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
