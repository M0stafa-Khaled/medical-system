import axiosAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/shared/types";
import { IPatientsRes, IPatientRes, ICreatePatient } from "./types";

export const getAllPatients = async ({
  page = 1,
  search,
}: IGetWithParams): Promise<IPatientsRes> =>
  (
    await axiosAPI.get(`/patients`, {
      params: { ...(search ? { q: search, page } : { page }) },
    })
  ).data;

export const getPatientById = async ({
  id,
}: {
  id: string;
}): Promise<IPatientRes> => (await axiosAPI.get(`/patients/${id}`)).data;

export const createPatient = async ({
  dataForm,
}: {
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
  const { data } = await axiosAPI.post(`/patients`, formData);
  return data;
};

export const updatePatient = async ({
  dataForm,
}: {
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
  const { data } = await axiosAPI.post(`/patients/${dataForm.id}`, formData);
  return data;
};

export const deletePatient = async ({ id }: { id: number }) =>
  (await axiosAPI.delete(`/patients/${id}`)).data;
