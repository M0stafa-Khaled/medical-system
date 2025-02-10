import axiosInstanceAPI from "@/config/axios.config";
import { IAddDoctor, IResponseDoctor, IResponseDoctors } from "@/interfaces";

export const getAllDoctors: (
  token: string
) => Promise<IResponseDoctors> = async (token) => {
  const { data } = await axiosInstanceAPI.get("/doctors", {
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
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
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
  console.log(dataForm.id);
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("commission", dataForm.commission);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("_method", "put");
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
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
  token: string | null;
}) => Promise<IResponseDoctor> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
