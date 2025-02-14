import axiosInstanceAPI from "@/config/axios.config";
import { IResponsePatients, IResponsePatient, IAddPatient } from "@/interfaces";

export const getAllPatients = async ({
  token,
  page = 1,
}: {
  token: string;
  page?: number;
}): Promise<IResponsePatients> => {
  const { data } = await axiosInstanceAPI.get(`/patients?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPatientById: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<IResponsePatient> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.get(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addPatient: ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: IAddPatient;
}) => Promise<IResponsePatient> = async ({ token, dataForm }) => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("gender", dataForm.gender.value);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("another_name", dataForm.another_name);
  formData.append("description", dataForm.description);
  if (dataForm.second_phone) {
    formData.append("second_phone", dataForm?.second_phone);
  }
  if (dataForm.personal_image) {
    formData.append("personal_image", dataForm.personal_image);
  }
  const { data } = await axiosInstanceAPI.post(`/patients`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updatePatient: ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: IAddPatient;
}) => Promise<IResponsePatient> = async ({ token, dataForm }) => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("gender", dataForm.gender.value);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  formData.append("another_name", dataForm.another_name);
  formData.append("description", dataForm.description);
  if (dataForm.second_phone) {
    formData.append("second_phone", dataForm?.second_phone);
  }
  if (dataForm.personal_image) {
    formData.append("personal_image", dataForm.personal_image);
  }
  formData.append("_method", "put");
  const { data } = await axiosInstanceAPI.post(
    `/patients/${dataForm.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deletePatient: ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => Promise<IResponsePatient> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
