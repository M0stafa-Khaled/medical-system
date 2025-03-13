import { IDoctor } from "../dashboard/doctors/doctor";

export interface IDoctorClinicsRes {
  status: boolean;
  data: IDoctor[];
}
