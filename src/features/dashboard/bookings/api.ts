import axiosAPI from "@/shared/lib/axios";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  IBookingRes,
  IBookingsRes,
  ICreateBooking,
  IUpdateBookingStatus,
} from "./types";

export const getAllBookings = async ({
  page,
  filter,
  sort,
}: IGetWithParams): Promise<IBookingsRes> =>
  (
    await axiosAPI.get(`/patients-bookings`, {
      params: { page, sort, ...(filter && { filter }) },
    })
  ).data;

export const getBookingById = async ({
  id,
}: {
  id: string;
}): Promise<IBookingRes> => (await axiosAPI(`/patients-bookings/${id}`)).data;

export const createBooking = async (
  formData: ICreateBooking
): Promise<IBookingRes> =>
  (await axiosAPI.post("/patients-bookings", formData)).data;

export const updateBooking = async (
  id: number,
  formData: ICreateBooking
): Promise<IBookingRes> =>
  (
    await axiosAPI.post(`/patients-bookings/${id}`, {
      ...formData,
      _method: "put",
    })
  ).data;

export const updateBookingStatus = async ({
  status,
  id,
}: IUpdateBookingStatus): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/patients-bookings/${id}/status`, {
      status,
    })
  ).data;

export const deleteBooking = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.delete(`/patients-bookings/${id}`)).data;
