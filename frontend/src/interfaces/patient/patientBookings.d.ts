import { TBookingStatus } from "@/types";
import { IClinic } from "../dashboard/clinics";
import { IDoctor } from "../dashboard/doctors/doctor";
import { IDoctorAction } from "../dashboard/doctors/doctorActions";
import { IWorkingDay } from "../dashboard/doctors/workingDays";
import { IPatient } from "../dashboard/patient";
import { IPaginationMeta } from "..";

export interface IPatientBooking {
  id: number;
  status: TBookingStatus;
  code: number;
  day: string;
  booking_date: string;
  start_at: string;
  created_at: string;
  patient: IPatient;
  doctor: IDoctor;
  action: IDoctorAction;
  clinic: IClinic;
  working_day: IWorkingDay;
}

export interface IPatientBookingsRes {
  status: boolean;
  message: null | string;
  data: {
    items: IPatientBooking[];
    meta: IPaginationMeta;
  };
}

export interface ICreatePatientBooking {
  token: string;
  booking: {
    clinic_id: string;
    doctor_id: string;
    working_day_id: string;
    doctor_action_id: string;
    start_at: string;
    date: string;
  };
}

export interface IUpdatePatientBooking extends ICreatePatientBooking {
  id: string;
}

export interface IPatientBookingsFilter {
  doctor: string;
  created_at: string | null;
  booking_date: string | null;
  status: string;
  clinic: string;
}
