import { TPrescriptableType } from "@/shared/types";
import { IPaginationMeta } from "../../shared/types";
import { IClinic } from "./clinics";
import { IDoctor } from "./doctors/doctor";
import { IPatient } from "../../features/dashboard/patients/types";

interface IPrescriptable {
  type: TPrescriptableType;
  name: string;
  drug_name?: string | null;
}

export interface IPrescription {
  id: number;
  date: string;
  note: string | null;
  clinic: IClinic;
  doctor: IDoctor;
  patient: IPatient;
  prescriptables: IPrescriptable[];
}

export interface IPrescriptionRes {
  status: boolean;
  message: string | null;
  data: IPrescription;
}

export interface IPrescriptionsRes {
  data: {
    items: IPrescription[];
    meta: IPaginationMeta;
  };
  status: boolean;
  message: string | null;
}

export interface IPrescriptionsFilter {
  patient: string;
  date: string;
  clinic: string;
  doctor: string;
}

export interface ICreatePrescription {
  token: string;
  prescription: {
    prescriptables: IPrescriptable[];
    prescription_date: string;
    booking_id?: string;
    patient_id?: string;
    doctor_id?: string;
    clinic_id?: string;
    note?: string;
  };
}

export interface IUpdatePrescription extends ICreatePrescription {
  id: string;
}
