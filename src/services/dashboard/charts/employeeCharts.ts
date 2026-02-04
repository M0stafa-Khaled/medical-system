import axiosAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import { ITreasuriesChartRes } from "@/interfaces/charts/charts";

export const getEmployeeTreasuriesChart = async ({
  token,
  filter,
}: IGetWithParams): Promise<ITreasuriesChartRes> => {
  const { data } = await axiosAPI.get("/charts/employee/treasury", {
    params: { ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
