import { IPaginationMeta } from ".";
import { IPermission } from "./auth";

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
  user: {
    id: number;
    email: string;
    role: "admin" | "employee";
  };
  permissions: IPermission[];
}

export interface IAddEmployee {
  id?: string;
  name: string;
  personal_id: string;
  email: string;
  password: string;
  role: {
    value: "admin" | "employee";
  };
  gender: {
    value: "male" | "female";
  };
  job: string;
  status: boolean;
  salary: string;
  first_phone: string;
  second_phone?: string | null;
  image?: File | undefined;
  personal_image?: File | undefined;
  permissions: {
    value: string;
  }[];
}

export interface IResponseEmployees {
  status: boolean;
  message: string | null;
  data: {
    items: IEmployee[];
    meta: IPaginationMeta;
  };
}

export interface IResponseEmployee {
  status: boolean;
  message: string;
  data: IEmployee;
}
