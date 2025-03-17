import axiosInstanceAPI from "@/config/axios.config";
import {
  IAvailableTimesRes,
  IDoctorClinicsRes,
  IGetAvailableTimes,
} from "@/interfaces/bookings/bookings";

export const getAllClinicsDoctors: ({
  token,
  clinic_id,
}: {
  token: string;
  clinic_id: string;
}) => Promise<IDoctorClinicsRes> = async ({ token, clinic_id }) => {
  const { data } = await axiosInstanceAPI.get(`/${clinic_id}/doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAvailableBookingsTimes: ({
  doctor_id,
  working_day_id,
  clinic_id,
  token,
  booking_date,
}: IGetAvailableTimes) => Promise<IAvailableTimesRes> = async ({
  doctor_id,
  working_day_id,
  clinic_id,
  booking_date,
  token,
}) => {
  const { data } = await axiosInstanceAPI.get(
    `/bookings/${doctor_id}/avaliable-times/${working_day_id}/clinic/${clinic_id}`,
    {
      params: {
        booking_date,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
