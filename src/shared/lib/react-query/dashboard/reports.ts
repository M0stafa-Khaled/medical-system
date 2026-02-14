import Query_Keys from "@/enums/queryKeys";
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
} from "@/services/dashboard/reports";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TRANSACTIONS_REPORT, page, filter, start_at, end_at],
    queryFn: () =>
      getTransactionsReport({ token, page, filter, start_at, end_at }),
  });

export const useGetTransfersReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TRANSFERS_REPORT, page, filter, start_at, end_at],
    queryFn: () =>
      getTransfersReport({ token, page, filter, start_at, end_at }),
  });

export const useGetExpensesReport = ({ token, page, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.EXPENSES_REPORT, page, filter],
    queryFn: () => getExpensesReport({ token, page, filter }),
  });

export const useGetBookingsReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.BOOKINGS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getBookingsReport({ token, page, filter, start_at, end_at }),
  });

export const useGetTreasuriesReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.TREASURIES_REPORT, page, filter, start_at, end_at],
    queryFn: () =>
      getTreasuriesReport({ token, page, filter, start_at, end_at }),
  });

export const useGetPrescriptionsReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.PRESCRIPTIONS_REPORT, page, filter, start_at, end_at],
    queryFn: () =>
      getPrescriptionsReport({ token, page, filter, start_at, end_at }),
  });

export const useGetPatientsReport = ({
  token,
  page,
  filter,
  start_at,
  end_at,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.PATIENTS_REPORT, page, filter, start_at, end_at],
    queryFn: () => getPatientsReport({ token, page, filter, start_at, end_at }),
  });

export const useGetPatientBalancesReport = (
  patientId: string,
  { token, filter, start_at, end_at }: IGetWithParams
) =>
  useQuery({
    queryKey: [Query_Keys.PATIENT_BALANCES_REPORT, filter, start_at, end_at],
    queryFn: () =>
      getPatientBalancesReport(patientId, { token, filter, start_at, end_at }),
    enabled: !!patientId,
  });
