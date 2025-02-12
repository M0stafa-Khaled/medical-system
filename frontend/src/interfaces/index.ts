import { TRole } from "@/types";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: ({ token, role }: { token: string; role: TRole }) => void;
  logout: () => void;
}

// Authentication Response Interfaces
export interface IAuthResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    role: TRole;
  };
}

// Form Input Interfaces
export interface IFormInput {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  accept?: string;
}

// Clinic Interfaces
export interface IClinic {
  id: number;
  name: string;
  status: boolean;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface IResponseClinics {
  status: boolean;
  message: string;
  data: IClinic[];
}

export interface ICreateClinic {
  id?: number;
  name: string;
  status: boolean;
  token: string | null;
}

export interface ICreateClinicResponse {
  status: boolean;
  message: string;
  data: ICreateClinic;
}

// Doctor Interfaces
export interface IDoctor {
  commission: string;
  created_at: string;
  first_phone: string;
  id: number;
  image: string | null;
  name: string;
  personal_id: string;
  second_phone: string | null;
  signature: string | null;
  status: boolean;
  updated_at: string;
  register_id: string;
  clinics: IClinic[];
  user?: {
    email: string;
    id: number;
    name: string | null;
    role: TRole;
  };
}

export interface IResponseDoctors {
  status: boolean;
  message: string;
  data: IDoctor[];
}

export interface IResponseDoctor {
  status: boolean;
  message: string;
  data: IDoctor;
}

export interface IAddDoctor {
  id?: number;
  name: string;
  personal_id: string;
  first_phone: string;
  second_phone?: string | null;
  commission: string;
  status: boolean;
  register_id: string;
  email: string;
  password: string;
  image?: File | undefined;
  signature?: File | undefined;
  clinics: {
    value: string;
  }[];
}
