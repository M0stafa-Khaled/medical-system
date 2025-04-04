import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/interfaces";
import {
  ICreateClinic,
  IResponseClinics,
} from "@/interfaces/dashboard/clinics";

export const getAllClinics = async ({
  token,
  filter,
}: IGetWithParams): Promise<IResponseClinics> => {
  const { data } = await axiosInstanceAPI.get("/clinics", {
    params: { ...(filter && { filter }) },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createClinic = async ({
  name,
  status,
  token,
}: ICreateClinic): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    "/clinics",
    { name, status: status ? "1" : "0", virtual_number: 5 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteClinic = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(`/clinics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateClinic = async ({
  id,
  name,
  status,
  token,
  virtual_number,
}: ICreateClinic): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    `/clinics/${id}`,
    { name, status: status ? "1" : "0", virtual_number, _method: "put" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
