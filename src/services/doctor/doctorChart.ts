import axiosAPI from "@/shared/lib/axios";
import { IChartRes, IGetWithParams } from "@/shared/types";

export const getDoctorBookingsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosAPI.get("/charts/doctor/bookings", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorPrescriptionsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosAPI.get("/charts/doctor/prescriptions", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorTransactionsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosAPI.get("/charts/doctor/transactions", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
