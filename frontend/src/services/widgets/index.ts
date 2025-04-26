import axiosInstanceAPI from "@/config/axios.config";
import {
  IAdminWidgetRes,
  IDoctorWidgetRes,
} from "@/interfaces/widgets/widgets";

export const getAdminWidgets = async (
  token: string
): Promise<IAdminWidgetRes> => {
  const { data } = await axiosInstanceAPI.get("/widgets/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorWidgets = async (
  token: string
): Promise<IDoctorWidgetRes> => {
  const { data } = await axiosInstanceAPI.get("/widgets/doctor", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
