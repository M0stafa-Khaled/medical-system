import { TRole } from "@/types";

export interface IPermission {
  id: number;
  name: string;
}

export interface IAuthResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    role: TRole;
    permissions: IPermission[];
  };
}

export interface ICheckAuth {
  auth: boolean;
  email_verified: boolean;
  status: boolean;
  permissions: IPermission[];
}

export interface IResponsePermissions {
  status: boolean;
  message: string | null;
  data: IPermission[];
}

export interface IResetPassword {
  code: string;
  password: string;
  password_confirmation: string;
}
