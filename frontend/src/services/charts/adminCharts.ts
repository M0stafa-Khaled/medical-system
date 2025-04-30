import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import { IChartRes, ITreasuriesChartRes } from "@/interfaces/charts/charts";

export const getActiveUsersChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/admin/active-users", {
    params: { ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getRegistrationChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/admin/registration", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getBookingsChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<IChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/admin/bookings", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getTreasuriesChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<ITreasuriesChartRes> => {
  const { data } = await axiosInstanceAPI.get("/charts/admin/treasuries", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
