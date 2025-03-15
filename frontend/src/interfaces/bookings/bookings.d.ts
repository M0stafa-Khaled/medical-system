import { IDoctor } from "../dashboard/doctors/doctor";

export interface IDoctorClinicsRes {
  status: boolean;
  message: string | null;
  data: IDoctor[];
}
