import { TBalanceType, TPaymentMethod } from "@/types";

export interface IBalance {
  id: number;
  payment_method: TPaymentMethod;
  amount_paid: string;
  total_amount_due: string;
  balance: string;
  transaction_code: string;
  refund_amount: string;
  created_at: string;
  type: TBalanceType;
}
