import { TRole } from "@/types";

export interface IProfile {
  id: number;
  name: string;
  another_name?: string;
  first_phone: string;
  second_phone: string | null;
  personal_id: string;
  personal_image?: string | null;
  status: boolean;
  gender: string;
  description?: string;
  user: {
    id: number;
    email: string;
    role: TRole;
  };
  image?: "";
  job?: TRole;
  salary?: string;
}

export interface IResponseProfile {
  data: IProfile;
  message: null;
  status: boolean;
}
