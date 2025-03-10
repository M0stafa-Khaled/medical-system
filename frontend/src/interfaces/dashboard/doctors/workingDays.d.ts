import { IDoctor } from "./doctor";

export interface IWorkingDay {
  id: number;
  day: string;
  start_at: string;
  end_at: string;
  max_visitors: number;
  clinic_name: string;
  deuration: number;
  doctor: IDoctor;
}

export interface IWorkingDaysRes {
  status: boolean;
  message: string | null;
  data: IWorkingDay[];
}

export interface ICreateWorkingDay {
  id?: number;
  day: string;
  start_at: string;
  end_at: string;
  max_visitors: number;
  doctor_id: string;
  clinic_name: string;
  deuration: number;
}
