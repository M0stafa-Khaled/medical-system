import { IPaginationMeta } from "@/shared/types";
import { IClinic } from "../clinics/types";
import { ITransaction } from "@/features/dashboard/transactions/types";

export interface IDoctor {
  id: number;
  commission: string;
  created_at: string;
  first_phone: string;
  image: string | null;
  signature: string | null;
  name: string;
  personal_id: string;
  second_phone: string | null;
  status: boolean;
  updated_at: string;
  gender: string;
  register_id: string;
  clinics: IClinic[];
  user?: {
    email: string;
    id: number;
    name: string | null;
    role: "doctor";
  };
}

export interface IResponseDoctors {
  status: boolean;
  message: string | null;
  data: {
    items: IDoctor[];
    meta: IPaginationMeta;
  };
}

export interface IResponseDoctor {
  status: boolean;
  message: string;
  data: IDoctor;
}

export interface ICreateDoctor {
  id?: string;
  name: string;
  personal_id: string;
  first_phone: string;
  second_phone?: string | null;
  commission: string;
  status: boolean;
  register_id: string;
  email: string;
  gender: "male" | "female";

  password: string;
  image?: File | undefined;
  signature?: File | undefined;
  clinics: string[];
}

export interface IDoctorAction {
  id: number;
  name: string;
  price: number;
}

export interface ICreateDoctorAction {
  formData: {
    doctor_id: string;
    name: string;
    price: string;
  };
  id?: string;
}

export interface IResponseDoctorActions {
  status: boolean;
  message: string | null;
  data: IDoctorAction[];
}

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
