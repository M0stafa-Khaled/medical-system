import axiosInstanceAPI from "@/config/axios.config";
import {
  IAvailableTimesRes,
  IDoctorClinicsRes,
  IGetAvailableTimes,
  IGetWithParams,
} from "@/interfaces";
import { IAnalysisRes } from "@/interfaces/dashboard/analysis";
import { IDrugsResponse } from "@/interfaces/dashboard/drugs";

export const getAllDrugs = async ({
  token,
  page = 1,
  search,
}: IGetWithParams): Promise<IDrugsResponse> => {
  const { data } = await axiosInstanceAPI.get("/drugs", {
    params: { ...(search ? { q: search, page } : { page }) },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllClinicsDoctors = async ({
  token,
  clinic_id,
}: {
  token: string;
  clinic_id: string;
}): Promise<IDoctorClinicsRes> => {
  const { data } = await axiosInstanceAPI.get(`/${clinic_id}/doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAvailableBookingsTimes = async ({
  doctor_id,
  working_day_id,
  clinic_id,
  booking_date,
  token,
}: IGetAvailableTimes): Promise<IAvailableTimesRes> => {
  const { data } = await axiosInstanceAPI.get(
    `/bookings/${doctor_id}/avaliable-times/${working_day_id}/clinic/${clinic_id}`,
    {
      params: {
        booking_date: booking_date,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getAllAnalytics = async ({
  token,
  page,
  search,
}: IGetWithParams): Promise<IAnalysisRes> => {
  const { data } = await axiosInstanceAPI.get("/analysis", {
    params: { ...(search ? { q: search, page } : { page }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
