export interface IDosage {
  id: number;
  name: string;
}

export interface IDosagesRes {
  status: boolean;
  message: string;
  data: IDosage[];
}

export interface ICreateDosage {
  name: string;
}

export interface IUpdateDosage extends ICreateDosage {
  id: number;
}
