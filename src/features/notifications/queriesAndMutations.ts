import Query_Keys from "@/shared/enums/queryKeys";
import {
  getNotifications,
  readAllNotifications,
  readNotification,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetNotifications = (enable: boolean) => {
  return useQuery({
    queryKey: [Query_Keys.NOTIFICATIONS],
    queryFn: () => getNotifications(),
    enabled: enable,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => readNotification({ id }),
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
    mutationFn: () => readAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.NOTIFICATIONS],
      });
    },
  });
};
