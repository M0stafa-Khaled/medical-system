import { IPaginationLink, IPaginationMeta } from "./";

export interface IDoctorAction {
  id: number;
  name: string;
  price: number;
}

export interface IActionProps {
  formData: IAddAction;
  token: string;
  id?: string;
}

export interface IAddAction {
  doctor_id: string;
  name: string;
  price: string;
}

export interface IResponseAction {
  status: boolean;
  message: string;
  data: IDoctorAction;
}

export interface IResponseActions {
  status: boolean;
  message: null;
  data: {
    items: IDoctorAction[];
    links: IPaginationLink[];
    meta: IPaginationMeta;
  };
}
