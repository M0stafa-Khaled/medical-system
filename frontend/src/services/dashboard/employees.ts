import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/interfaces";
import {
  ICreateEmployee,
  IEmployeeRes,
  IEmployeesRes,
} from "@/interfaces/dashboard/employee";

export const getAllEmployees = async ({
  token,
  page = 1,
  search = "",
}: IGetWithParams): Promise<IEmployeesRes> => {
  const { data } = await axiosInstanceAPI.get(`/employees`, {
    params: { ...(search ? { q: search, page } : { page }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getEmployeeById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IEmployeeRes> => {
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
}) => Promise<IStatusMsg> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createEmployee: ({
  dataForm,
  token,
}: {
  dataForm: ICreateEmployee;
  token: string;
}) => Promise<IEmployeeRes> = async ({
  dataForm,
  token,
}): Promise<IEmployeeRes> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("role", dataForm.role);
  formData.append("gender", dataForm.gender);
  formData.append("job", dataForm.job);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);

  if (dataForm.treasury_id)
    formData.append("treasury_id", dataForm?.treasury_id);
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);

  if (dataForm.permissions && dataForm.role === "employee")
    dataForm.permissions.map((permission, idx) =>
      formData.append(`permissions[${idx}]`, permission)
    );
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
  dataForm: ICreateEmployee;
  token: string;
}) => Promise<IEmployeeRes> = async ({
  dataForm,
  token,
}): Promise<IEmployeeRes> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("role", dataForm.role);
  formData.append("gender", dataForm.gender);
  formData.append("job", dataForm.job);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");

  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);

  if (dataForm.treasury_id)
    formData.append("treasury_id", dataForm?.treasury_id);

  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image) {
    formData.append("personal_image", dataForm.personal_image);
  }
  if (dataForm.permissions)
    dataForm.permissions.map((permission, idx) =>
      formData.append(`permissions[${idx}]`, permission)
    );
  formData.append("_method", "put");
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
