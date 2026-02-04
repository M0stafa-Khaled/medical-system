import axiosAPI from "@/config/axios.config";
import { IAdminWidgetRes } from "@/interfaces/widgets/widgets";

export const getAdminWidgets = async (
  token: string
): Promise<IAdminWidgetRes> => {
  const { data } = await axiosAPI.get("/widgets/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
