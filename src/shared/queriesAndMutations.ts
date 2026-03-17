import { useQuery } from "@tanstack/react-query";
import Query_Keys from "./enums/queryKeys";
import { getAllClinicsDoctors, getAvailableBookingsTimes } from "./api";
import { IGetAvailableTimes } from "./types";

export const useGetAllClinicDoctors = ({ clinic_id }: { clinic_id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_CLINIC_DOCTORS, clinic_id],
    enabled: !!clinic_id,
    queryFn: () => getAllClinicsDoctors({ clinic_id }),
  });

export const useGetAvailableBookingsTime = ({
  doctor_id,
  working_day_id,
  clinic_id,
  booking_date,
}: IGetAvailableTimes) =>
  useQuery({
    queryKey: [
      Query_Keys.GET_AVAILABLE_BOOKINGS_TIME,
      doctor_id,
      working_day_id,
      clinic_id,
      booking_date,
    ],
    queryFn: () =>
      getAvailableBookingsTimes({
        booking_date,
        doctor_id,
        working_day_id,
        clinic_id,
      }),
    enabled: !!doctor_id && !!working_day_id && !!clinic_id && !!booking_date,
  });
