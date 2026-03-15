import axiosAPI from "@/shared/lib/axios";
import { IStatusMsg, IGetWithParams } from "@/shared/types";
import {
  ICreateDoctor,
  ICreateDoctorAction,
  IDoctorTransactionsRes,
  IResponseDoctor,
  IResponseDoctorActions,
  IResponseDoctors,
} from "./types";

export const getAllDoctors = async ({
  page = 1,
  search,
}: IGetWithParams): Promise<IResponseDoctors> =>
  (
    await axiosAPI.get(`/doctors`, {
      params: { ...(search ? { q: search, page } : { page }) },
    })
  ).data;

export const getDoctorById = async ({
  id,
}: {
  id: string;
}): Promise<IResponseDoctor> => (await axiosAPI.get(`doctors/${id}`)).data;

export const createDoctor = async ({
  dataForm,
}: {
  dataForm: ICreateDoctor;
}): Promise<IStatusMsg> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("commission", dataForm.commission);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("register_id", dataForm.register_id);
  formData.append("gender", dataForm.gender);
  dataForm.clinics.map((clinic, idx) =>
    formData.append(`clinics[${idx}]`, clinic)
  );
  formData.append("second_phone", dataForm?.second_phone || "");
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.signature) formData.append("signature", dataForm.signature);
  const { data } = await axiosAPI.post("/doctors", formData);
  return data;
};

export const updateDoctor = async ({
  dataForm,
}: {
  dataForm: ICreateDoctor;
}): Promise<IStatusMsg> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("commission", dataForm.commission);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("_method", "put");
  formData.append("register_id", dataForm.register_id);
  formData.append("gender", dataForm.gender.toLowerCase());
  formData.append(
    "second_phone",
    dataForm?.second_phone ? dataForm?.second_phone : ""
  );

  dataForm.clinics.map((clinic, idx) =>
    formData.append(`clinics[${idx}]`, clinic)
  );

  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.signature) formData.append("signature", dataForm.signature);
  const { data } = await axiosAPI.post(`/doctors/${dataForm.id}`, formData);
  return data;
};

export const deleteDoctor = async ({
  id,
}: {
  id: number;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/doctors/${id}`)).data;

export const getDoctorActions = async ({
  doctorId,
}: {
  doctorId: string;
}): Promise<IResponseDoctorActions> =>
  (await axiosAPI.get(`/${doctorId}/actions`)).data;

export const createDoctorAction = async ({
  formData,
}: ICreateDoctorAction): Promise<IStatusMsg> =>
  (await axiosAPI.post("actions", formData)).data;

export const updateDoctorAction = async ({
  formData,
  id,
}: ICreateDoctorAction): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/actions/${id}`, {
      ...formData,
      _method: "put",
    })
  ).data;

export const deleteDoctorAction = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/actions/${id}`)).data;

export const getDoctorTransactions = async ({
  id,
}: {
  id: string;
}): Promise<IDoctorTransactionsRes> =>
  (await axiosAPI.get(`/${id}/transactions`)).data;

export const createDoctorTransaction = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.post(`/${id}/transactions/add-expense`)).data;
