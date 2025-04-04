import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import {
  ICreateWorkingDay,
  IWorkingDay,
  IWorkingDaysRes,
} from "@/interfaces/dashboard/doctors/workingDays";

export const getAllWorkingDays = async ({
  doctorId,
  token,
  search,
}: {
  doctorId: string;
  token: string;
  search?: string;
}): Promise<IWorkingDaysRes> => {
  const { data } = await axiosInstanceAPI.get(`${doctorId}/working-days`, {
    params: { ...(search && { q: search }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getWorkingDayById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<{ status: boolean; data: IWorkingDay }> => {
  const { data } = await axiosInstanceAPI.get(`/working-days/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createWorkingDay = async ({
  formData,
  token,
}: ICreateWorkingDay): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post("/working-days", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateWorkingDay = async ({
  formData,
  token,
}: ICreateWorkingDay): Promise<IStatusMsg> => {
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

export const deleteWorkingDay = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(`/working-days/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
