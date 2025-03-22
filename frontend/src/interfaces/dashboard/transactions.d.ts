import { TPaymentMethod } from "@/types";
import { IPaginationMeta } from "..";
import { IBalance } from "./balances";
import { IDoctor } from "./doctors/doctor";
import { IDoctorAction } from "./doctors/doctorActions";
import { IEmployee } from "./employee";
import { IPatient } from "./patient";
import { ITreasury } from "./treasury";

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
  action: IDoctorAction;
  doctor: IDoctor;
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
  formData: {
    price: number;
    booking_id: number;
    doctor_action_id: number;
    contract_type: "insurance" | "egyption";
    payment_method: TPaymentMethod;
    card_number?: string;
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
