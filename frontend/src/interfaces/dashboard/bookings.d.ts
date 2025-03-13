import { TBookingStatus } from "@/types";
import { IPaginationMeta } from "..";
import { IDoctor } from "./doctors/doctor";
import { IPatient } from "./patient";
import { IEmployee } from "./employee";

export interface IBooking {
  id: number;
  status: TBookingStatus;
  code: number;
  day: string;
  clinic: string;
  booking_date: string;
  start_at: string;
  created_at: string;
  patient: IPatient;
  doctor: IDoctor;
  employee: IEmployee;
}

export interface IBookingsRes {
  status: boolean;
  data: {
    items: IBooking[];
    meta: IPaginationMeta;
  };
}
export interface ICreateBooking {
  token: string;
  formData: {
    patient_id: string;
    doctor_id: string;
    working_day_id: string;
    clinic_name: string;
  };
}

export interface IUpdateBooking extends ICreateBooking {
  id: string;
  formData: {
    patient_id: string;
    doctor_id: string;
    working_day_id: string;
    clinic_name: string;
    status: TBookingStatus;
  };
}
