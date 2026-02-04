import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import {
  getActiveUsersChart,
  getBookingsChart,
  getRegistrationChart,
  getTreasuriesChart,
} from "@/services/dashboard/charts/adminCharts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetActiveUsersChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.ACTIVE_USERS_CHART, filter],
    queryFn: () => getActiveUsersChart({ token, filter }),
    placeholderData: keepPreviousData,
  });

export const useGetRegistrationChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.REGISTRATION_CHART, filter],
    queryFn: () => getRegistrationChart({ token, filter }),
    placeholderData: keepPreviousData,
  });

export const useGetBookingsChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.BOOKINGS_CHART, filter],
    queryFn: () => getBookingsChart({ token, filter }),
    placeholderData: keepPreviousData,
  });

export const useGetTreasuriesChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TREASURIES_CHART, filter],
    queryFn: () => getTreasuriesChart({ token, filter }),
    placeholderData: keepPreviousData,
  });
