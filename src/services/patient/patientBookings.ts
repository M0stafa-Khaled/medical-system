import {
  ICreatePatientBooking,
  IUpdatePatientBooking,
} from "../../interfaces/patient/patientBookings";
import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  IPatientBooking,
  IPatientBookingsRes,
} from "@/interfaces/patient/patientBookings";

export const getAllPatientBookings = async ({
  token,
  filter,
  sort = "-date",
  page,
}: IGetWithParams): Promise<IPatientBookingsRes> => {
  const { data } = await axiosAPI.get("/bookings", {
    params: { ...(filter && { filter }), sort, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPatientBookingById = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<{ status: string; message: string; data: IPatientBooking }> => {
  const { data } = await axiosAPI.get(`/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createPatientBooking = async ({
  token,
  booking,
}: ICreatePatientBooking): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post("/bookings", booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updatePatientBooking = async ({
  token,
  booking,
  id,
}: IUpdatePatientBooking): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
    `/bookings/${id}`,
    { ...booking, _method: "put" },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const deletePatientBooking = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
