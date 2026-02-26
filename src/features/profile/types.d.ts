import { type TRole } from "@/shared/types";
import { IDoctor } from "../dashboard/doctors/types";
import { IPatient } from "../dashboard/patients/types";
import { IEmployee } from "../dashboard/employees/types";

export interface IProfileRes {
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
