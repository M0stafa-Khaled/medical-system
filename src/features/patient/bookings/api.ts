import axiosAPI from "@/shared/lib/axios";
import { IGetWithParams } from "@/shared/types";
import {
  ICreatePatientBooking,
  IDeletePatientBooking,
  IPatientBookingByIdRes,
  IPatientBookingsRes,
  IUpdatePatientBooking,
  TPatientBookingMutationRes,
} from "./types";

export const getAllPatientBookings = async ({
  page,
  filter,
  sort = "-date",
}: IGetWithParams): Promise<IPatientBookingsRes> =>
  (
    await axiosAPI.get("/bookings", {
      params: { page, sort, ...(filter && { filter }) },
    })
  ).data;

export const getPatientBookingById = async ({
  id,
}: {
  id: string;
}): Promise<IPatientBookingByIdRes> =>
  (await axiosAPI.get(`/bookings/${id}`)).data;

export const createPatientBooking = async (
  booking: ICreatePatientBooking
): Promise<TPatientBookingMutationRes> =>
  (await axiosAPI.post("/bookings", booking)).data;

export const updatePatientBooking = async ({
  id,
  ...values
}: IUpdatePatientBooking): Promise<TPatientBookingMutationRes> =>
  (
    await axiosAPI.post(`/bookings/${id}`, {
      ...values,
      _method: "put",
    })
  ).data;

export const deletePatientBooking = async ({
  id,
}: IDeletePatientBooking): Promise<TPatientBookingMutationRes> =>
  (await axiosAPI.delete(`/bookings/${id}`)).data;
