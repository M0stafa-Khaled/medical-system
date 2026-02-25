import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import {
  getBookingsReport,
  getExpensesReport,
  getPatientBalancesReport,
  getPatientsReport,
  getPrescriptionsReport,
  getTransactionsReport,
  getTransfersReport,
  getTreasuriesReport,
} from "./api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TRANSACTIONS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getTransactionsReport({ page, filter, start_at, end_at }),
  });

export const useGetTransfersReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TRANSFERS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getTransfersReport({ page, filter, start_at, end_at }),
  });

export const useGetExpensesReport = ({ page, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.EXPENSES_REPORT, page, filter],
    queryFn: () => getExpensesReport({ page, filter }),
  });

export const useGetBookingsReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.BOOKINGS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getBookingsReport({ page, filter, start_at, end_at }),
  });

export const useGetTreasuriesReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TREASURIES_REPORT, page, filter, start_at, end_at],
    queryFn: () => getTreasuriesReport({ page, filter, start_at, end_at }),
  });

export const useGetPrescriptionsReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.PRESCRIPTIONS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getPrescriptionsReport({ page, filter, start_at, end_at }),
  });

export const useGetPatientsReport = ({
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.PATIENTS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getPatientsReport({ page, filter, start_at, end_at }),
  });

export const useGetPatientBalancesReport = (
  patientId: string,
  { filter, start_at, end_at }: IGetWithParams
) =>
  useQuery({
    queryKey: [Query_Keys.PATIENT_BALANCES_REPORT, filter, start_at, end_at],
    queryFn: () =>
      getPatientBalancesReport(patientId, { filter, start_at, end_at }),
    enabled: !!patientId,
  });
