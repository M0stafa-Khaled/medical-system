import { IPaginationMeta } from ".";

export interface IMedication {
  name: string;
  form: string;
}

export interface IMedicationsResponse {
  status: boolean;
  message: null | string;
  data: {
    items: IMedication[];
    meta: IPaginationMeta;
  };
}
