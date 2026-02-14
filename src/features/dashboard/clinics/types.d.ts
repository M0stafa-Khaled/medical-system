export interface IClinic {
  id: number;
  name: string;
  status: boolean;
  virtual_number: string;
  created_at: string;
  updated_at: string;
}

export interface IClinicsRes {
  status: boolean;
  message: string | null;
  data: IClinic[];
}

export interface ICreateClinic {
  name: string;
  status: boolean;
  virtual_number?: number;
}
export interface IUpdateClinic extends ICreateClinic {
  id: number;
}
