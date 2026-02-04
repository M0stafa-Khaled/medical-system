import { IPaginationMeta } from "..";

export interface IScan {
  id: number;
  name: string;
  arabic_name: string;
  abbreviation: string;
}

export interface IScansRes {
  status: boolean;
  message: null | string;
  data: {
    items: IScan[];
    meta: IPaginationMeta;
  };
}
