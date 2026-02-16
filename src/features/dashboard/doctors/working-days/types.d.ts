import { IClinic } from "@/features/dashboard/clinics/types";
import { IDoctor } from "../types";

export interface IWorkingDay {
  id: number;
  day: string;
  start_at: string;
  end_at: string;
  max_visitors: number;
  clinic: IClinic;
  deuration: number;
  doctor: IDoctor;
}

export interface IWorkingDaysRes {
  status: boolean;
  message: string | null;
  data: IWorkingDay[];
}

export interface ICreateWorkingDay {
  day: string;
  start_at: string;
  end_at: string;
  max_visitors: number;
  doctor_id: string;
  clinic_id: string;
  deuration: number;
}

export interface IUpdateWorkingDay extends ICreateWorkingDay {
  id?: number;
}
