export interface IClinic {
  id: number;
  name: string;
  status: boolean;
  virtual_number: string;
  created_at: string;
  updated_at: string;
}

export interface IResponseClinics {
  status: boolean;
  message: string | null;
  data: IClinic[];
}

export interface ICreateClinic {
  id?: number;
  name: string;
  status: boolean;
  token: string;
  virtual_number?: number;
}
