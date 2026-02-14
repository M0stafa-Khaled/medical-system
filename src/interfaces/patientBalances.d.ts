import { TBalanceType, TPaymentMethod } from "@/shared/types";

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
  visa_code: string;
}

export interface IPatientBalancesRes {
  status: boolean;
  message: string | null;
  data: {
    items: IBalance[];
    total_amount_due: number;
    total_amount_paid: number;
    refund_amount: number;
    total_balance: string;
  };
}

export interface ICreatePatientPayment {
  token: string;
  patientId: string;
  transaction: {
    amount: number;
    payment_method: string;
    transaction_code: string;
    visa_code?: string;
  };
}
