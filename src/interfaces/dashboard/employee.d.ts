import { IPaginationMeta } from "..";
import { IPermission } from "../auth/auth";

export interface IEmployee {
  id: number;
  name: string;
  first_phone: string;
  second_phone: string;
  personal_id: string;
  image: string | null;
  personal_image: string | null;
  status: true;
  created_at: string;
  gender: string;
  job: string;
  salary: string;
  treasury?: {
    id: number;
    name: string;
    status: boolean;
    expenses_total: number;
  };
  user: {
    id: number;
    email: string;
    role: "admin" | "employee";
    last_login_at: string | null;
    last_logout_at: string | null;
    active: boolean;
  };
  permissions: IPermission[];
}

export interface ICreateEmployee {
  id?: string;
  name: string;
  personal_id: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  treasury_id?: string;
  gender: "male" | "female";
  job: string;
  status: boolean;
  salary: string;
  first_phone: string;
  second_phone?: string | null;
  image?: File | undefined;
  personal_image?: File | undefined;
  permissions: string[];
}

export interface IEmployeesRes {
  status: boolean;
  message: string | null;
  data: {
    items: IEmployee[];
    meta: IPaginationMeta;
  };
}

export interface IEmployeeRes {
  status: boolean;
  message: string;
  data: IEmployee;
}
