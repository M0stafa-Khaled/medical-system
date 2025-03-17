import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes } from "@/interfaces";
import {
  ICreateWorkingDay,
  IWorkingDay,
  IWorkingDaysRes,
} from "@/interfaces/dashboard/doctors/workingDays";

export const getAllWorkingDays: ({
  doctorId,
  token,
  search,
}: {
  doctorId: string;
  token: string;
  search?: string;
}) => Promise<IWorkingDaysRes> = async ({ doctorId, token, search }) => {
  const { data } = await axiosInstanceAPI.get(`${doctorId}/working-days`, {
    params: { ...(search && { q: search }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getWorkingDayById: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<{ status: boolean; data: IWorkingDay }> = async ({
  id,
  token,
}) => {
  const { data } = await axiosInstanceAPI.get(`/working-days/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createWorkingDay: ({
  token,
  formData,
}: ICreateWorkingDay) => Promise<IWorkingDaysRes> = async ({
  formData,
  token,
}) => {
  const { data } = await axiosInstanceAPI.post("/working-days", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateWorkingDay: ({
  token,
  formData,
}: ICreateWorkingDay) => Promise<IWorkingDaysRes> = async ({
  formData,
  token,
}) => {
  const { data } = await axiosInstanceAPI.post(
    `/working-days/${formData.id}`,
    { ...formData, _method: "put" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteWorkingDay: ({
  token,
  id,
}: {
  id: number;
  token: string;
}) => Promise<IDeleteRes> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/working-days/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
