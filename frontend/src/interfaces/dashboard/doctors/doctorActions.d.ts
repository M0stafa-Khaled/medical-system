import { IPaginationMeta } from ".";

export interface IDoctorAction {
  id: number;
  name: string;
  price: number;
}

export interface IDoctorActionProps {
  formData: {
    doctor_id: string;
    name: string;
    price: string;
  };
  token: string;
  id?: string;
}

export interface IResponseDoctorAction {
  status: boolean;
  message: string;
  data: IDoctorAction;
}

export interface IResponseDoctorActions {
  status: boolean;
  message: null;
  data: {
    items: IDoctorAction[];
    meta: IPaginationMeta;
  };
}
