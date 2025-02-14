import axiosInstanceAPI from "@/config/axios.config";
import {
  IAddEmployee,
  IResponseEmployee,
  IResponseEmployees,
} from "@/interfaces";

export const getAllEmployees: (
  token: string
) => Promise<IResponseEmployees> = async (token: string) => {
  const { data } = await axiosInstanceAPI.get("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getEmployeeById: ({
  token,
  id,
}: {
  id: string;
  token: string;
}) => Promise<IResponseEmployees> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.get(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteEmployee: ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => Promise<IResponseEmployee> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addEmployee: ({
  dataForm,
  token,
}: {
  dataForm: IAddEmployee;
  token: string;
}) => Promise<IResponseEmployee> = async ({
  dataForm,
  token,
}): Promise<IResponseEmployee> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("role", dataForm.role.value);
  formData.append("gender", dataForm.gender.value);
  formData.append("jop", dataForm.jop);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);
  const { data } = await axiosInstanceAPI.post("/employees", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const updateEmployee: ({
  dataForm,
  token,
}: {
  dataForm: IAddEmployee;
  token: string;
}) => Promise<IResponseEmployee> = async ({
  dataForm,
  token,
}): Promise<IResponseEmployee> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("role", dataForm.role.value);
  formData.append("gender", dataForm.gender.value);
  formData.append("jop", dataForm.jop);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);
  const { data } = await axiosInstanceAPI.post(
    `/employees/${dataForm.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
