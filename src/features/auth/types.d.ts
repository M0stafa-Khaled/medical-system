import { TRole } from "@/shared/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: number;
  name: string;
  token: string;
  role: TRole;
  permissions: IPermission[];
}
export interface ILoginRes {
  status: boolean;
  message: string;
  data: IAuthUser;
}

export interface IRegister {
  name: string;
  first_phone: string;
  personal_id: string;
  gender: string;
  another_name?: string;
  second_phone?: string;
  email: string;
  password: string;
  personal_image: File;
}

export interface IRegisterRes {
  status: boolean;
  message: string;
  data: IAuthUser;
}

export interface ICheckAuth {
  auth: boolean;
  email_verified: boolean;
  status: boolean;
  permissions: IPermission[];
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IPermissionsRes {
  status: boolean;
  message: string | null;
  data: IPermission[];
}

export interface IResetPassword {
  code: string;
  password: string;
  password_confirmation: string;
}
