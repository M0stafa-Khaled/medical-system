import { useQuery } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import {
  getAllClinicsDoctors,
  getAvailableBookingsTimes,
} from "@/services/bookings/bookings";
import { IGetAvailableTimes } from "@/interfaces/bookings/bookings";

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
