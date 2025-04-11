import { useQuery } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import {
  getAllAnalytics,
  getAllClinicsDoctors,
  getAllDrugs,
  getAvailableBookingsTimes,
} from "@/services/main";
import { IGetAvailableTimes, IGetWithParams } from "@/interfaces";

export const useGetALlDrugs = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DRUGS, page, search],
    queryFn: () => getAllDrugs({ token, page, search }),
  });

export const useGetAllAnalytics = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_ANALYTICS, page, search],
    queryFn: () => getAllAnalytics({ token, page, search }),
  });

export const useGetAllDoctorsClinics = ({
  token,
  clinic_id,
}: {
  token: string;
  clinic_id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTORS_CLINICS, clinic_id],
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
