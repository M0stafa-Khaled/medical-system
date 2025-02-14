import axiosInstanceAPI from "@/config/axios.config";
import { IResponsePatients, IResponsePatient } from "@/interfaces";

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
