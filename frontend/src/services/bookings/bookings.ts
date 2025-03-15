import axiosInstanceAPI from "@/config/axios.config";
import { IDoctorClinicsRes } from "@/interfaces/bookings/bookings";

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
