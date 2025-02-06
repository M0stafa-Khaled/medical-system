import axiosInstanceAPI from "@/config/axios.config";
import {
  IClinicsResponse,
  ICreateClinic,
  ICreateClinicResponse,
} from "@/interfaces";
import cookieServices from "@/utils/cookieServices";

const token = cookieServices.getToken();
export const getAllClinics: () => Promise<IClinicsResponse> = async () => {
  const { data } = await axiosInstanceAPI.get("/clinics", {
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

export const deleteClinic: (
  id: number
) => Promise<ICreateClinicResponse> = async (id) => {
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
}: {
  id: number;
  name: string;
  status: boolean;
}) => Promise<ICreateClinicResponse> = async ({ id, name, status }) => {
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
