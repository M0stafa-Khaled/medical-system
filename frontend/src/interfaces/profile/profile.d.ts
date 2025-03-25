import { IDoctor } from "../dashboard/doctors/doctor";
import { IPatient } from "../dashboard/patient";
import { IEmployee } from "../dashboard/employee";

export interface IResponseProfile {
  data: IDoctor | IPatient | IEmployee;
  message: null;
  status: boolean;
}

export interface IChangePassword {
  token: string;
  password: string;
  password_confirmation: string;
}
