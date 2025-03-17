import { IDoctor } from "../dashboard/doctors/doctor";

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
