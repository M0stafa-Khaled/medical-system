import { IChart } from "@/shared/types";

export interface IWidgets {
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

export interface ITreasuriesChart extends IChart {
  total: number;
  treasury_name: string;
}

export interface ITreasuriesChartRes {
  status: boolean;
  message: string | null;
  data: ITreasuriesChart;
}

export interface IDashboardFilters {
  treasury_start_at?: string;
  treasury_end_at?: string;
  treasury?: string;
  booking_start_at?: string;
  booking_end_at?: string;
  booking_status?: string;
  register_start_at?: string;
  register_end_at?: string;
}

export interface IAdminWidgetRes {
  status: boolean;
  message: string | null;
  data: IWidgets;
}

export interface ITreasuriesChart extends IChart {
  total: string;
  treasury_name: string;
}

export interface ITreasuriesChartRes {
  status: boolean;
  message: string | null;
  data: ITreasuriesChart;
}
