import { TRole } from "@/types";

export interface ILoginFormInput {
  name: string;
  type: string;
  label: string;
}

export interface IAuthResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    role: TRole;
  };
}
export interface IClinic {
  id: number;
  name: string;
  status: boolean;
  company_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface IClinicsResponse {
  status: boolean;
  message: string;
  data: IClinic[];
}

export interface ICreateClinic {
  name: string;
  status: boolean;
}

export interface ICreateClinicResponse {
  status: boolean;
  message: string;
  data: ICreateClinic;
}
