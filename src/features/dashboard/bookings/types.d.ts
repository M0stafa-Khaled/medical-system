import { IPaginationMeta, TBookingStatus } from "@/shared/types";
import { IDoctor, IDoctorAction } from "../doctors/types";
import { IEmployee } from "../employees/types";
import { IClinic } from "../clinics/types";
import { IWorkingDay } from "../doctors/working-days/types";

export interface IBooking {
  id: number;
  code: number;
  status: TBookingStatus;
  day: string;
  booking_date: string;
  start_at: string;
  created_at: string;
  patient: IPatient;
  doctor: IDoctor;
  employee: IEmployee;
  action: IDoctorAction;
  clinic: IClinic;
  working_day: IWorkingDay;
}

export interface IBookingsRes {
  status: boolean;
  message: string | null;
  data: {
    items: IBooking[];
    meta: IPaginationMeta;
  };
}
export interface ICreateBooking {
  status?: string;
  patient_id: string;
  doctor_id: string;
  working_day_id: string;
  clinic_id: string;
  doctor_action_id: string;
  date: string;
  start_at: string;
}

export interface IUpdateBookingStatus {
  status: TBookingStatus;
  id: number;
}

export interface IBookingsFilter {
  doctor: string;
  patient: string;
  created_at: string | null;
  booking_date: string | null;
  status: string;
  clinic: string;
  sort: string;
}
