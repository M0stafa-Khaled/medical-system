import axiosAPI from "@/shared/lib/axios";
import { IStatusMsg } from "@/shared/types";
import {
  ICreateWorkingDay,
  IUpdateWorkingDay,
  IWorkingDay,
  IWorkingDaysRes,
} from "./types";

export const getAllWorkingDays = async ({
  doctorId,
  search,
}: {
  doctorId: string;
  search?: string;
}): Promise<IWorkingDaysRes> =>
  (
    await axiosAPI.get(`${doctorId}/working-days`, {
      params: { ...(search && { q: search }) },
    })
  ).data;

export const getWorkingDayById = async ({
  id,
}: {
  id: string;
}): Promise<{ status: boolean; data: IWorkingDay }> =>
  (await axiosAPI.get(`/working-days/${id}`)).data;

export const createWorkingDay = async (
  formData: ICreateWorkingDay
): Promise<IStatusMsg> => (await axiosAPI.post("/working-days", formData)).data;

export const updateWorkingDay = async (
  formData: IUpdateWorkingDay
): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/working-days/${formData.id}`, {
      ...formData,
      _method: "put",
    })
  ).data;

export const deleteWorkingDay = async ({
  id,
}: {
  id: number;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/working-days/${id}`)).data;
