export interface IDoctorAction {
  id: number;
  name: string;
  price: number;
}

export interface ICreateDoctorAction {
  formData: {
    doctor_id: string;
    name: string;
    price: string;
  };
  token: string;
  id?: string;
}

export interface IResponseDoctorActions {
  status: boolean;
  message: string | null;
  data: IDoctorAction[];
}
