import axiosAPI from "@/config/axios.config";
import { IStatusMsg } from "@/shared/types";
import { INotificationsRes } from "@/interfaces/notifications";

export const getNotifications = async (
  token: string
): Promise<INotificationsRes> => {
  const { data } = await axiosAPI.get("/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const readNotification = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
    `/notifications/${id}/read`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const readAllNotifications = async (
  token: string
): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
    "/notifications/read-all",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
