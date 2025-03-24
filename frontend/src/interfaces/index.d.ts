import { IDoctor } from "../dashboard/doctors/doctor";
export interface ILink {
  name: string;
  path?: string;
  icon?: ReactNode;
  children?: ILink[];
}

export interface IDeleteRes {
  status: boolean;
  message: string;
}
// Form Input Interfaces
export interface IFormInput {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  accept?: string;
}

// Pagination Interfaces
export interface IPaginationMeta {
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

// Get interface
export interface IGetWithParams {
  token: string;
  page?: number;
  search?: string;
  filter?: Record<string, string>;
  sort?: string;
}

// Bookings

export interface IDoctorClinicsRes {
  status: boolean;
  message: string | null;
  data: IDoctor[];
}
export interface IGetAvailableTimes {
  doctor_id: string;
  working_day_id: string;
  clinic_id: string;
  booking_date: string;
  token: string;
}

export interface IAvailableTimesRes {
  status: boolean;
  message: string | null;
  data: string[];
}
