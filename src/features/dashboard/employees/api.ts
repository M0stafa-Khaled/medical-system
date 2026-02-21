import axiosAPI from "@/shared/lib/axios";
import { IStatusMsg, IGetWithParams } from "@/shared/types";
import { ICreateEmployee, IEmployeeRes, IEmployeesRes } from "./types";

export const getAllEmployees = async ({
  token,
  page = 1,
  search = "",
}: IGetWithParams): Promise<IEmployeesRes> =>
  (
    await axiosAPI.get(`/employees`, {
      params: { ...(search ? { q: search, page } : { page }) },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

export const getEmployeeById = async ({
  id,
}: {
  id: string;
}): Promise<IEmployeeRes> => (await axiosAPI.get(`/employees/${id}`)).data;

export const deleteEmployee = async ({
  id,
}: {
  id: number;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/employees/${id}`)).data;

export const createEmployee = async ({
  dataForm,
}: {
  dataForm: ICreateEmployee;
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
  const { data } = await axiosAPI.post("/employees", formData);
  return data;
};
export const updateEmployee = async ({
  dataForm,
}: {
  dataForm: ICreateEmployee;
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

  const { data } = await axiosAPI.post(`/employees/${dataForm.id}`, formData);
  return data;
};
