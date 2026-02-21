import axiosAPI from "@/shared/lib/axios";
import { IStatusMsg } from "@/shared/types";
import { INotificationsRes } from "@/features/notifications/types";

export const getNotifications = async (): Promise<INotificationsRes> =>
  (await axiosAPI.get("/notifications")).data;

export const readNotification = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.post(`/notifications/${id}/read`)).data;

export const readAllNotifications = async (): Promise<IStatusMsg> =>
  (await axiosAPI.post("/notifications/read-all")).data;
