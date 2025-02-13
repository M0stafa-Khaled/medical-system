import axiosInstanceAPI from "@/config/axios.config";
import { IResponsePatients, IResponsePatient } from "@/interfaces";

export const getAllPatients: (
  token: string
) => Promise<IResponsePatients> = async (token) => {
  const { data } = await axiosInstanceAPI.get("/patients", {
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
