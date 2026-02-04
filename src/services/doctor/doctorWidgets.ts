import axiosAPI from "@/config/axios.config";
import { IDoctorWidgetRes } from "@/interfaces/widgets/widgets";

export const getDoctorWidgets = async (
  token: string
): Promise<IDoctorWidgetRes> => {
  const { data } = await axiosAPI.get("/widgets/doctor", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
