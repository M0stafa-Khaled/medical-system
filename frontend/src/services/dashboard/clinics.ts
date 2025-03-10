import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetWithParams } from "@/interfaces";
import {
  ICreateClinic,
  ICreateClinicResponse,
  IResponseClinics,
} from "@/interfaces/dashboard/clinic";

export const getAllClinics: ({
  token,
  search,
}: IGetWithParams) => Promise<IResponseClinics> = async ({ token, search }) => {
  const { data } = await axiosInstanceAPI.get("/clinics", {
    params: {
      q: search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createClinic: ({
  name,
  status,
}: ICreateClinic) => Promise<ICreateClinicResponse> = async ({
  name,
  status,
  token,
}) => {
  const { data } = await axiosInstanceAPI.post(
    "/clinics",
    { name, status: status ? "1" : "0" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteClinic: ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => Promise<IDeleteRes> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/clinics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateClinic: ({
  id,
  name,
  status,
  token,
}: ICreateClinic) => Promise<ICreateClinicResponse> = async ({
  id,
  name,
  status,
  token,
}) => {
  const { data } = await axiosInstanceAPI.put(
    `/clinics/${id}?name=${name}&status=${status ? "1" : "0"}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
