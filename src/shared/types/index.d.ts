import { IDoctor } from "../dashboard/doctors/doctor";
import { IBalance } from "../../interfaces/patientBalances";

import { AxiosError } from "axios";

type AxiosResErr = AxiosError<{ message: string }>;

export type TRole = "admin" | "doctor" | "employee" | "patient";

export type TBookingStatus =
  | "pending"
  | "collected"
  | "cancelled"
  | "no-show"
  | "ended"
  | "completed";

export type TPaymentMethod = "cash" | "visa";

export type TBalanceType = "inquiry" | "payment";

export type TPrescriptableType = "scan" | "analysis" | "dosage";

export interface ILink {
  name: string;
  path?: string;
  icon?: ReactNode;
  children?: ILink[];
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
export interface IStatusMsg {
  status: boolean;
  message: string;
}

export interface IGetWithParams {
  page?: number;
  search?: string;
  filter?: Record<string, string>;
  sort?: string;
  start_at?: string;
  end_at?: string;
  token?: string;
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

export interface IPatientBalancesTransactionsRes {
  status: boolean;
  message: null | string;
  data: IBalance[];
}

export interface IChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
}

export interface IChart {
  datasets: IChartDataset[];
  labels: string[];
}

export interface IChartRes<T = IChart> {
  status: boolean;
  message: string | null;
  data: T;
}
