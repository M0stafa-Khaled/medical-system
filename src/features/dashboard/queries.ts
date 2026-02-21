import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getActiveUsersChart,
  getBookingsChart,
  getRegistrationChart,
  getTreasuriesChart,
  getEmployeeTreasuriesChart,
  getAdminWidgets,
} from "./api";

export const useGetEmployeeTreasuriesChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.EMPLOYEE_TREASURIES_CHART, filter],
    queryFn: () => getEmployeeTreasuriesChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetActiveUsersChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.ACTIVE_USERS_CHART, filter],
    queryFn: () => getActiveUsersChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetRegistrationChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.REGISTRATION_CHART, filter],
    queryFn: () => getRegistrationChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetBookingsChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.BOOKINGS_CHART, filter],
    queryFn: () => getBookingsChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetTreasuriesChart = ({ filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TREASURIES_CHART, filter],
    queryFn: () => getTreasuriesChart({ filter }),
    placeholderData: keepPreviousData,
  });

export const useGetAdminWidgets = () =>
  useQuery({
    queryKey: [Query_Keys.ADMIN_WIDGETS],
    queryFn: () => getAdminWidgets(),
  });
