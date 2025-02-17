import { TRole } from "@/types";

export interface IAuthResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    role: TRole;
  };
}

export interface ICheckAuth {
  auth: boolean;
  email_verified: boolean;
  status: boolean;
}
