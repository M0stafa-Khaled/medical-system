import axiosAPI from "@/shared/lib/axios";
import {
  IAvailableTimesRes,
  IDoctorClinicsRes,
  IGetAvailableTimes,
} from "@/shared/types";

export const getAllClinicsDoctors = async ({
  clinic_id,
}: {
  clinic_id: string;
}): Promise<IDoctorClinicsRes> =>
  (await axiosAPI.get(`/${clinic_id}/doctors`)).data;

export const getAvailableBookingsTimes = async ({
  doctor_id,
  working_day_id,
  clinic_id,
  booking_date,
}: IGetAvailableTimes): Promise<IAvailableTimesRes> =>
  (
    await axiosAPI.get(
      `/bookings/${doctor_id}/avaliable-times/${working_day_id}/clinic/${clinic_id}`,
      {
        params: {
          booking_date: booking_date,
        },
      }
    )
  ).data;
