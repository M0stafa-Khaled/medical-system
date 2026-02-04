import axiosAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/interfaces";
import {
  IPatientsRes,
  IPatientRes,
  ICreatePatient,
} from "@/interfaces/dashboard/patient";

export const getAllPatients = async ({
  token,
  page = 1,
  search,
}: IGetWithParams): Promise<IPatientsRes> => {
  const { data } = await axiosAPI.get(`/patients`, {
    params: { ...(search ? { q: search, page } : { page }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPatientById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IPatientRes> => {
  const { data } = await axiosAPI.get(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createPatient = async ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: ICreatePatient;
}): Promise<IStatusMsg> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("gender", dataForm.gender);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  if (dataForm.description)
    formData.append("description", dataForm.description);
  if (dataForm.another_name)
    formData.append("another_name", dataForm.another_name);
  if (dataForm.info_status)
    formData.append("info_status", dataForm.info_status);
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);
  const { data } = await axiosAPI.post(`/patients`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updatePatient = async ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: ICreatePatient;
}): Promise<IStatusMsg> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("gender", dataForm.gender);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("_method", "put");
  if (dataForm.description)
    formData.append("description", dataForm.description);
  if (dataForm.another_name)
    formData.append("another_name", dataForm.another_name);
  if (dataForm.info_status)
    formData.append("info_status", dataForm.info_status);
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);
  const { data } = await axiosAPI.post(`/patients/${dataForm.id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deletePatient = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  const { data } = await axiosAPI.delete(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
