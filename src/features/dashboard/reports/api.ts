import { IGetWithParams } from "@/shared/types";
import { ITransactionsRes } from "../transactions/types";
import axiosAPI from "@/shared/lib/axios";
import { ITransfersRes, ITreasuriesReportRes } from "./types";
import { IExpensesRes } from "../expenses/types";
import { IBookingsRes } from "../bookings/types";
import { IPrescriptionsRes } from "../prescriptions/types";
import { IPatientsRes } from "../patients/types";
import { IPatientBalancesRes } from "../patients/balances/types";

export const getTransactionsReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITransactionsRes> =>
  (
    await axiosAPI.get("/reports/all-transactions", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getTransfersReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITransfersRes> =>
  (
    await axiosAPI.get("/reports/all-transfers", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getExpensesReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
}: IGetWithParams): Promise<IExpensesRes> =>
  (
    await axiosAPI.get("/reports/all-expenses", {
      params: { page, sort, ...(filter && { filter }) },
    })
  ).data;

export const getBookingsReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IBookingsRes> =>
  (
    await axiosAPI.get("/reports/all-bookings", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getTreasuriesReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<ITreasuriesReportRes> =>
  (
    await axiosAPI.get("/reports/all-treasuries", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getPrescriptionsReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IPrescriptionsRes> =>
  (
    await axiosAPI.get("/reports/all-prescriptions", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getPatientsReport = async ({
  page = 1,
  filter,
  sort = "-created_at",
  start_at,
  end_at,
}: IGetWithParams): Promise<IPatientsRes> =>
  (
    await axiosAPI.get("/reports/all-patients", {
      params: {
        page,
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;

export const getPatientBalancesReport = async (
  patientId: string,
  { filter, sort = "-created_at", start_at, end_at }: IGetWithParams
): Promise<IPatientBalancesRes> =>
  (
    await axiosAPI.get(`/reports/${patientId}/all-balances`, {
      params: {
        sort,
        ...(filter && { filter }),
        ...(start_at && { start_at }),
        ...(end_at && { end_at }),
      },
    })
  ).data;
