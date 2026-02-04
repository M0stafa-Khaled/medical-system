import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  IBooking,
  IBookingsRes,
  ICreateBooking,
  IUpdateBookingStatus,
} from "@/interfaces/dashboard/bookings";

export const getAllBookings = async ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams): Promise<IBookingsRes> => {
  const { data } = await axiosAPI.get(`/patients-bookings`, {
    params: { page, sort, ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const getBookingById = async ({
  id,
  token,
}: {
  token: string;
  id: string;
}): Promise<{ status: boolean; message: string; data: IBooking }> => {
  const { data } = await axiosAPI(`/patients-bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createBooking = async ({
  formData,
  token,
}: ICreateBooking): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post("/patients-bookings", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateBooking = async ({
  formData,
  token,
  id,
}: ICreateBooking): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
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

export const updateBookingStatus = async ({
  token,
  status,
  id,
}: IUpdateBookingStatus): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
    `/patients-bookings/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteBooking = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/patients-bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
