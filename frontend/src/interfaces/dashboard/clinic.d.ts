export interface IClinic {
  id: number;
  name: string;
  status: boolean;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface IResponseClinics {
  status: boolean;
  message: string;
  data: IClinic[];
}

export interface ICreateClinic {
  id?: number;
  name: string;
  status: boolean;
  token: string | null;
}

export interface ICreateClinicResponse {
  status: boolean;
  message: string;
  data: ICreateClinic;
}
