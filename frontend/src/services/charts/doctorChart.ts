import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import { IChartRes } from "@/interfaces/charts/charts";

export const getDoctorBookingsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/doctor/bookings", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorPrescriptionsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/doctor/prescriptions", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorTransactionsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/doctor/transactions", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
