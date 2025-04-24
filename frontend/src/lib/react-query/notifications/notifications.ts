import Query_Keys from "@/enums/queryKeys";
import {
  getNotifications,
  readAllNotifications,
  readNotification,
} from "@/services/notifications/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetNotifications = (token: string) => {
  return useQuery({
    queryKey: [Query_Keys.NOTIFICATIONS],
    queryFn: () => getNotifications(token),
    enabled: !!token,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      readNotification({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.NOTIFICATIONS],
      });
    },
  });
};

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => readAllNotifications(token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.NOTIFICATIONS],
      });
    },
  });
};
