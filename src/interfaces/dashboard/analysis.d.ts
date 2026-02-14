import { IPaginationMeta } from "../../shared/types";

export interface IAnalysis {
  id: number;
  name: string;
  arabic_name: string;
  abbreviation: string;
}

export interface IAnalysisRes {
  status: boolean;
  message: string | null;
  data: {
    items: IAnalysis[];
    meta: IPaginationMeta;
  };
}
