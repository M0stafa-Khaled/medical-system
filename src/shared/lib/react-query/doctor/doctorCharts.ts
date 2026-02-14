import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import {
  getDoctorBookingsChart,
  getDoctorPrescriptionsChart,
  getDoctorTransactionsChart,
} from "@/services/doctor/doctorChart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetDoctorBookingsChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_BOOKINGS_CHART, filter],
    queryFn: () => getDoctorBookingsChart({ token, filter }),
    placeholderData: keepPreviousData,
  });

export const useGetDoctorPrescriptionsChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_PRESCRIPTIONS_CHART, filter],
    queryFn: () => getDoctorPrescriptionsChart({ token, filter }),
    placeholderData: keepPreviousData,
  });

export const useGetDoctorTransactionsChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TREASURIES_CHART, filter],
    queryFn: () => getDoctorTransactionsChart({ token, filter }),
    placeholderData: keepPreviousData,
  });
