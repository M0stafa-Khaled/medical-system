import axiosAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/shared/types";
import {
  ICreateDoctor,
  IResponseDoctor,
  IResponseDoctors,
} from "@/interfaces/dashboard/doctors/doctor";

export const getAllDoctors = async ({
  token,
  page = 1,
  search,
}: IGetWithParams): Promise<IResponseDoctors> => {
  const { data } = await axiosAPI.get(`/doctors`, {
    params: { ...(search ? { q: search, page } : { page }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getDoctorById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IResponseDoctor> => {
  const { data } = await axiosAPI.get(`doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createDoctor = async ({
  dataForm,
  token,
}: {
  dataForm: ICreateDoctor;
  token: string;
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
  const { data } = await axiosAPI.post("/doctors", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateDoctor = async ({
  dataForm,
  token,
}: {
  dataForm: ICreateDoctor;
  token: string;
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
  const { data } = await axiosAPI.post(`/doctors/${dataForm.id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteDoctor = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
