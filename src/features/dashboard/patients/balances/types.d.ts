import { IBalance } from "@/interfaces/dashboard/transactions/transactions";

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
  patientId: string;
  transaction: {
    amount: number;
    payment_method: string;
    transaction_code: string;
    visa_code?: string;
  };
}
