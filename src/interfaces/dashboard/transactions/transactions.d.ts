import { TPaymentMethod } from "@/shared/types";
import { IPaginationMeta } from "..";
import { IDoctor } from "../doctors/doctor";
import { IEmployee } from "./employee";
import { ITreasury } from "./treasury";
import { IDoctorAction } from "../doctors/doctorActions";
import { IPatient } from "../../../features/dashboard/patients/types";

export interface ITransaction {
  id: number;
  status: boolean;
  refund_info: string | null;
  code: string;
  card_number: string;
  contract_type: string;
  created_at: string;
  employee: IEmployee;
  treasury: ITreasury;
  balance: IBalance;
  actions: IDoctorAction[];
  doctor: {
    commission_status: boolean;
    item: IDoctor;
  };
  patient: IPatient;
}

export interface ITransactionsRes {
  status: boolean;
  message: string | null;
  data: {
    items: ITransaction[];
    meta: IPaginationMeta;
  };
}

export interface ICreateTransaction {
  token: string;
  dataForm: {
    price: number;
    booking_id: string;
    doctor_actions: string[];
    contract_type: "insurance" | "egyption";
    payment_method: TPaymentMethod;
    card_number?: string;
    visa_code?: number;
  };
}

export interface IRefundTransaction {
  token: string;
  id: number;
  refund_info: string;
}

export interface ITransactionsFilter {
  doctor: string;
  action: string;
  treasury: string;
  status: string;
  created_at: string | null;
  patient: string;
  code: string;
  employee: string;
}

export interface IPatientLastVisits {
  status: boolean;
  message: string | null;
  data: ITransaction[];
}

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
