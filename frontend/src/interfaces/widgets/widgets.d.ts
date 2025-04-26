import { IWorkingDay } from "../dashboard/doctors/workingDays";

export interface IAdminWidget {
  treasuries_count: number;
  expenses_count: number;
  transactions_count: number;
  transfers_count: number;
  bookings_count: number;
  patients_count: number;
  employees_count: number;
  doctors_count: number;
  clinics_count: number;
  prescriptions_count: number;
}

export interface IAdminWidgetRes {
  status: boolean;
  message: string | null;
  data: IAdminWidget;
}

export interface IDoctorWidget {
  transactions_total: number;
  bookings_count: number;
  clinics_count: number;
  patients_count: number;
  prescriptions_count: number;
  working_days: IWorkingDay[];
}

export interface IDoctorWidgetRes {
  status: boolean;
  message: string | null;
  data: IDoctorWidget;
}
