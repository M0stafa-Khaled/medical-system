import { TBookingStatus, IPaginationMeta, IStatusMsg } from "@/shared/types";

export interface IPatientMini {
  id: number;
  name: string;
}

export interface IClinicMini {
  id: number;
  name: string;
}

export interface IDoctorMini {
  id: number;
  name: string;
}

export interface IWorkingDayMini {
  id: number;
  day: string;
  start_at: string;
  end_at: string;
}

export interface IDoctorActionMini {
  id: number;
  name: string;
  price: string;
}

export interface IPatientBooking {
  id: number;
  status: TBookingStatus;
  code: number;
  day: string;
  booking_date: string;
  start_at: string;
  created_at: string;
  patient: IPatientMini;
  doctor: IDoctorMini;
  action: IDoctorActionMini;
  clinic: IClinicMini;
  working_day: IWorkingDayMini;
}

export interface IPatientBookingsRes {
  status: boolean;
  message: string | null;
  data: {
    items: IPatientBooking[];
    meta: IPaginationMeta;
  };
}

export interface IPatientBookingByIdRes {
  status: boolean;
  message: string;
  data: IPatientBooking;
}

export interface ICreatePatientBooking {
  clinic_id: string;
  doctor_id: string;
  working_day_id: string;
  doctor_action_id: string;
  start_at: string;
  date: string;
}

export interface IUpdatePatientBooking extends ICreatePatientBooking {
  id: string;
}

export interface IDeletePatientBooking {
  id: string;
}

export type TPatientBookingStatus = Extract<
  TBookingStatus,
  "pending" | "cancelled"
>;

export type TPatientBookingMutationRes = IStatusMsg;
