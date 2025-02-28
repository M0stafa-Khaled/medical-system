import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetTokenPageSearch } from "@/interfaces";
import {
  IAddEmployee,
  IEmployeeRes,
  IEmployeesRes,
} from "@/interfaces/employee";

export const getAllEmployees = async ({
  token,
  page = 1,
  search = "",
}: IGetTokenPageSearch): Promise<IEmployeesRes> => {
  const { data } = await axiosInstanceAPI.get(`/employees`, {
    params: {
      ...(search ? { q: search } : { page, q: search }),
    },
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
}) => Promise<IEmployeeRes> = async ({ id, token }) => {
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
}) => Promise<IDeleteRes> = async ({ id, token }) => {
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
}) => Promise<IEmployeeRes> = async ({
  dataForm,
  token,
}): Promise<IEmployeeRes> => {
  const formData = new FormData();
  formData.append("name", dataForm.name);
  formData.append("personal_id", dataForm.personal_id);
  formData.append("email", dataForm.email);
  formData.append("password", dataForm.password);
  formData.append("role", dataForm.role.value);
  formData.append("gender", dataForm.gender.value);
  formData.append("job", dataForm.job);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");
  if (dataForm.second_phone)
    formData.append("second_phone", dataForm?.second_phone);

  if (dataForm.treasury_id)
    formData.append("treasury_id", dataForm?.treasury_id.value);
  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);

  if (dataForm.permissions)
    dataForm.permissions.map((permission, idx) =>
      formData.append(`permissions[${idx}]`, permission.value)
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
  dataForm: IAddEmployee;
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
  formData.append("role", dataForm.role.value);
  formData.append("gender", dataForm.gender.value);
  formData.append("job", dataForm.job);
  formData.append("salary", dataForm.salary);
  formData.append("first_phone", dataForm.first_phone);
  formData.append("status", dataForm.status ? "1" : "0");

  if (dataForm.personal_image)
    formData.append("personal_image", dataForm.personal_image);

  if (dataForm.treasury_id)
    formData.append("treasury_id", dataForm?.treasury_id.value);

  if (dataForm.image) formData.append("image", dataForm.image);
  if (dataForm.personal_image) {
    formData.append("personal_image", dataForm.personal_image);
  }
  if (dataForm.permissions)
    dataForm.permissions.map((permission, idx) =>
      formData.append(`permissions[${idx}]`, permission.value)
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
