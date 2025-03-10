import { IPaginationMeta } from "..";
import { IDoctor } from "./doctors/doctor";
import { IPatient } from "./patient";

export interface IBooking {
  id: number;
  status: "pending";
  code: 1;
  day: string;
  clinic: string;
  booking_date: string;
  start_at: string;
  created_at: string;
  patient: IPatient;
  doctor: IDoctor;
}

export interface IBookingsRes {
  status: boolean;
  data: {
    items: IBooking[];
    meta: IPaginationMeta;
  };
}
