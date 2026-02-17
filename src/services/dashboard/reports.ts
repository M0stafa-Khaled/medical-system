import axiosAPI from "@/config/axios.config";
import { IGetWithParams } from "@/shared/types";
import { IBookingsRes } from "@/features/dashboard/bookings/types";
import { IExpensesRes } from "@/features/dashboard/expenses/types";
import { IPatientsRes } from "@/features/dashboard/patients/types";
import { IPrescriptionsRes } from "@/interfaces/dashboard/prescription";
import {
  ITransfersRes,
  ITreasuriesReportRes,
} from "@/interfaces/dashboard/reports";
import { ITransactionsRes } from "@/interfaces/dashboard/transactions/transactions";
import { IPatientBalancesRes } from "@/features/dashboard/patients/balances/types";

export const getTransactionsReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITransactionsRes> => {
  const { data } = await axiosAPI.get("/reports/all-transactions", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getTransfersReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITransfersRes> => {
  const { data } = await axiosAPI.get("/reports/all-transfers", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getExpensesReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
}: IGetWithParams): Promise<IExpensesRes> => {
  const { data } = await axiosAPI.get("/reports/all-expenses", {
    params: { page, sort, ...(filter && { filter }) },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getBookingsReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IBookingsRes> => {
  const { data } = await axiosAPI.get("/reports/all-bookings", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getTreasuriesReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITreasuriesReportRes> => {
  const { data } = await axiosAPI.get("/reports/all-treasuries", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPrescriptionsReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IPrescriptionsRes> => {
  const { data } = await axiosAPI.get("/reports/all-prescriptions", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPatientsReport = async ({
  token,
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IPatientsRes> => {
  const { data } = await axiosAPI.get("/reports/all-patients", {
    params: {
      page,
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPatientBalancesReport = async (
  patientId: string,
  { token, filter, sort = "-created_at", start_at, end_at }: IGetWithParams
): Promise<IPatientBalancesRes> => {
  const { data } = await axiosAPI.get(`/reports/${patientId}/all-balances`, {
    params: {
      sort,
      ...(filter && { filter }),
      ...(start_at && { start_at }),
      ...(end_at && { end_at }),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
