import { IDoctor } from "../dashboard/doctors/doctor";
import { IPatient } from "../dashboard/patient";
import { IEmployee } from "../dashboard/employee";
import { TRole } from "@/types";

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

export interface IUpdateProfile {
  token: string;
  role: TRole;
  dataForm: {
    image?: File | undefined;
    signature?: File | undefined;
    personal_image?: File;
    first_phone?: string;
    second_phone?: string;
    another_name?: string;
  };
}
