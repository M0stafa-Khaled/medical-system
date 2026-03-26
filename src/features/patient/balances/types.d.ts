import { IPaginationMeta } from "@/shared/types";

export interface IPatientBalanceItem {
  id: number;
  payment_method: "cash" | "visa";
  amount_paid: string;
  total_amount_due: string;
  balance: string;
  transaction_code: string;
  refund_amount: string;
  created_at: string;
  type: "inquiry" | "payment";
  visa_code: string;
}

export interface IPatientBalancesRes {
  status: boolean;
  message: string | null;
  data: {
    items: IPatientBalanceItem[];
    total_amount_due: number;
    total_amount_paid: number;
    refund_amount: number;
    total_balance: string;
    meta?: IPaginationMeta;
  };
}
