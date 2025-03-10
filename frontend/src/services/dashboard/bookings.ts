import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetWithParams } from "@/interfaces";
import {
  IBooking,
  IBookingsRes,
  ICreateBooking,
  IUpdateBooking,
} from "@/interfaces/dashboard/bookings";

export const getAllBookings: ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams) => Promise<IBookingsRes> = async ({
  token,
  page,
  filter,
  sort,
}) => {
  const { data } = await axiosInstanceAPI.get(`/patients-bookings`, {
    params: { page, sort, ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const getBookingById: ({
  id,
  token,
}: {
  token: string;
  id: string;
}) => Promise<{ status: boolean; message: string; data: IBooking }> = async ({
  id,
  token,
}) => {
  const { data } = await axiosInstanceAPI(`/patients-bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createBooking: ({ formData, token }: ICreateBooking) => Promise<{
  status: boolean;
  message: string;
}> = async ({ formData, token }) => {
  const { data } = await axiosInstanceAPI.post("/patients-bookings", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateBooking: ({
  formData,
  token,
  id,
}: IUpdateBooking) => Promise<{
  status: boolean;
  message: string;
}> = async ({ formData, token, id }) => {
  const { data } = await axiosInstanceAPI.post(
    `/patients-bookings/${id}`,
    { ...formData, _method: "put" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteBooking: ({
  id,
  token,
}: {
  token: string;
  id: string;
}) => Promise<IDeleteRes> = async ({ token, id }) => {
  const { data } = await axiosInstanceAPI.delete(`/patients-bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
