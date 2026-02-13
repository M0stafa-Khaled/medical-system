import { type IDoctor } from "../dashboard/doctors/doctor";
import { type IPatient } from "../dashboard/patient";
import { type IEmployee } from "../dashboard/employee";
import { type TRole } from "@/types";

export interface IResponseProfile {
  data: IDoctor | IPatient | IEmployee;
  message: null;
  status: boolean;
}

export interface IChangePassword {
  password: string;
  password_confirmation: string;
}

export interface IUpdateProfile {
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
