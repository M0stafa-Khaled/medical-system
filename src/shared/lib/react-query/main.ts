import { useQuery } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import {
  getAllAnalysis,
  getAllClinicsDoctors,
  getAllDrugs,
  getAllPatientBalancesTransactions,
  getAvailableBookingsTimes,
} from "@/services/main";
import { IGetAvailableTimes, IGetWithParams } from "@/shared/types";

export const useGetALlDrugs = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DRUGS, page, search],
    queryFn: () => getAllDrugs({ token, page, search }),
  });

export const useGetAllAnalysis = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_ANALYSIS, page, search],
    queryFn: () => getAllAnalysis({ token, page, search }),
  });


export const useGetAllClinicDoctors = ({
  token,
  clinic_id,
}: {
  token: string;
  clinic_id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_CLINIC_DOCTORS, clinic_id],
    enabled: !!clinic_id,
    queryFn: () => getAllClinicsDoctors({ token, clinic_id }),
  });

export const useGetAvailableBookingsTime = ({
  doctor_id,
  working_day_id,
  clinic_id,
  token,
  booking_date,
}: IGetAvailableTimes) =>
  useQuery({
    queryKey: [Query_Keys.GET_AVAILABLE_BOOKINGS_TIME],
    queryFn: () =>
      getAvailableBookingsTimes({
        booking_date,
        doctor_id,
        working_day_id,
        clinic_id,
        token,
      }),
    enabled: !!doctor_id && !!working_day_id && !!clinic_id && !!booking_date,
  });

export const useGetAllPatientTransactionsBalances = ({
  token,
  search,
  patientId,
}: {
  token: string;
  search: string;
  patientId: string;
}) =>
  useQuery({
    queryKey: [
      Query_Keys.GET_ALL_PATIENT_TRANSACTIONS_BALANCES,
      token,
      search,
      patientId,
    ],
    queryFn: () =>
      getAllPatientBalancesTransactions({ token, search, patientId }),
    enabled: !!patientId,
  });
