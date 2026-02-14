import { IPaginationMeta } from "../../shared/types";

export interface IDrug {
  name: string;
  form: string;
}

export interface IDrugsResponse {
  status: boolean;
  message: string | null;
  data: {
    items: IDrug[];
    meta: IPaginationMeta;
  };
}
