import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetWithParams } from "@/interfaces";
import {
  IAddDoctor,
  IResponseDoctor,
  IResponseDoctors,
} from "@/interfaces/dashboard/doctors/doctor";

export const getAllDoctors = async ({
  token,
  page = 1,
  search = " ",
}: IGetWithParams): Promise<IResponseDoctors> => {
  const { data } = await axiosInstanceAPI.get(`/doctors`, {
    params: {
      ...(search ? { q: search } : { page, q: search }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getDoctorById: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<IResponseDoctor> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.get(`doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addDoctor: ({
  dataForm,
  token,
}: {
  dataForm: IAddDoctor;
  token: string;
}) => Promise<IResponseDoctor> = async ({ dataForm, token }) => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("commission", dataForm.commission);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("register_id", dataForm.register_id);
  formData.append("gender", dataForm.gender.value);
  dataForm.clinics.map((clinic, idx) =>
    formData.append(`clinics[${idx}]`, clinic.value)
  );
  formData.append("second_phone", dataForm?.second_phone || "");
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.signature) formData.append("signature", dataForm.signature);
  const { data } = await axiosInstanceAPI.post("/doctors", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateDoctor: ({
  dataForm,
  token,
}: {
  dataForm: IAddDoctor;
  token: string;
}) => Promise<IResponseDoctor> = async ({ dataForm, token }) => {
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
  formData.append("gender", dataForm.gender.value.toLowerCase());
  formData.append(
    "second_phone",
    dataForm?.second_phone ? dataForm?.second_phone : ""
  );

  dataForm.clinics.map((clinic, idx) =>
    formData.append(`clinics[${idx}]`, clinic.value)
  );

  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.signature) formData.append("signature", dataForm.signature);
  const { data } = await axiosInstanceAPI.post(
    `/doctors/${dataForm.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteDoctor: ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => Promise<IDeleteRes> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
