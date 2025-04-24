import axiosInstanceAPI from "@/config/axios.config";
import { IClinicsRes } from "@/interfaces/dashboard/clinics";

export const getDoctorClinics = async (token: string): Promise<IClinicsRes> => {
  const { data } = await axiosInstanceAPI.get("doctor-clinics", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
