import { IWorkingDay } from "@/features/dashboard/doctors/working-days/types";

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
