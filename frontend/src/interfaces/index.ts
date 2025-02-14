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

export interface ICheckAuth {
  auth: boolean;
  email_verified: boolean;
  status: boolean;
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
    role: TRole;
  };
}

export interface IPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IPaginationMeta {
  first_page_url: string;
  from: number;
  last_page: number;
  links: IPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IResponseDoctors {
  status: boolean;
  message: string | null;
  data: {
    items: IDoctor[];
    links: IPaginationLink[];
    meta: IPaginationMeta;
  };
}

export interface IResponseDoctor {
  status: boolean;
  message: string;
  data: IDoctor;
}

export interface IAddDoctor {
  id?: string;
  name: string;
  personal_id: string;
  first_phone: string;
  second_phone?: string | null;
  commission: string;
  status: boolean;
  register_id: string;
  email: string;
  gender: {
    value: "male" | "female";
  };
  password: string;
  image?: File | undefined;
  signature?: File | undefined;
  clinics: {
    value: string;
  }[];
}

// Employees Interfaces
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
}

export interface IResponseEmployees {
  status: boolean;
  message: string | null;
  data: {
    items: IEmployee[];
    links: IPaginationLink[];
    meta: IPaginationMeta;
  };
}

export interface IResponseEmployee {
  status: boolean;
  message: string;
  data: IEmployee;
}

// Patient interfaces
export interface IPatient {
  id: number;
  name: string;
  another_name: string;
  first_phone: string;
  second_phone: string;
  personal_id: string;
  personal_image: string | null;
  status: true;
  grander: string;
  description: string;
  user: {
    id: number;
    email: string;
    role: "patient";
  };
}

export interface IResponsePatients {
  status: boolean;
  message: string | null;
  data: {
    items: IPatient[];
    links: IPaginationLink[];
    meta: IPaginationMeta;
  };
}

export interface IResponsePatient {
  status: boolean;
  message: string;
  data: IPatient;
}
