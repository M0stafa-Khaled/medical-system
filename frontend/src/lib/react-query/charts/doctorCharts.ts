import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import {
  getDoctorBookingsChart,
  getDoctorPrescriptionsChart,
  getDoctorTransactionsChart,
} from "@/services/charts/doctorChart";
import { useQuery } from "@tanstack/react-query";

export const useGetDoctorBookingsChart = ({ token, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_BOOKINGS_CHART, filter],
    queryFn: () => getDoctorBookingsChart({ token, filter }),
  });

export const useGetDoctorPrescriptionsChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_PRESCRIPTIONS_CHART, filter],
    queryFn: () => getDoctorPrescriptionsChart({ token, filter }),
  });

export const useGetDoctorTransactionsChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TREASURIES_CHART, filter],
    queryFn: () => getDoctorTransactionsChart({ token, filter }),
  });
