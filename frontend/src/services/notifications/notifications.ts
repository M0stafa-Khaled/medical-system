import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import { INotificationsRes } from "@/interfaces/notifications";

export const getNotifications = async (
  token: string
): Promise<INotificationsRes> => {
  console.log(token);
  const { data } = await axiosInstanceAPI.get("/notifications", {
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
  const { data } = await axiosInstanceAPI.post(
    `/notifications/${id}/read`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const readAllNotifications = async (
  token: string
): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    "/notifications/read-all",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
