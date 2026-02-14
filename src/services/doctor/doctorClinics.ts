import axiosAPI from "@/config/axios.config";
import { IClinicsRes } from "@/features/dashboard/clinics/types";

export const getDoctorClinics = async (token: string): Promise<IClinicsRes> => {
  const { data } = await axiosAPI.get("doctor-clinics", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
