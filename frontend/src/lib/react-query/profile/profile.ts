import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import {
  changePassword,
  getUserProfile,
  updateProfile,
} from "@/services/profile/profile";
import { IChangePassword, IUpdateProfile } from "@/interfaces/profile/profile";

export const useGetUserProfile = (token: string) => {
  return useQuery({
    queryFn: () => getUserProfile(token),
    queryKey: [Query_Keys.GET_USER_PROFILE],
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, role, dataForm }: IUpdateProfile) =>
      updateProfile({ token, role, dataForm }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_USER_PROFILE],
      });
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, password, password_confirmation }: IChangePassword) =>
      changePassword({ token, password, password_confirmation }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_USER_PROFILE],
      });
    },
  });
};
