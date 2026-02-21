import axiosAPI from "@/shared/lib/axios";
import type { IChartRes, IGetWithParams } from "@/shared/types";
import type { IAdminWidgetRes, ITreasuriesChartRes } from "./types";

export const getActiveUsersChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/admin/active-users", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getRegistrationChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/admin/registration", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getBookingsChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/admin/bookings", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getTreasuriesChart = async ({
  filter,
}: IGetWithParams): Promise<ITreasuriesChartRes> =>
  (
    await axiosAPI.get("/charts/admin/treasuries", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getAdminWidgets = async (): Promise<IAdminWidgetRes> =>
  (await axiosAPI.get("/widgets/admin")).data;

export const getEmployeeTreasuriesChart = async ({
  filter,
}: IGetWithParams): Promise<ITreasuriesChartRes> =>
  (
    await axiosAPI.get("/charts/employee/treasury", {
      params: { ...(filter && { filter }) },
    })
  ).data;
