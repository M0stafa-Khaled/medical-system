import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import { changePassword, getUserProfile, updateProfile } from "./api";
import { IChangePassword, IUpdateProfile } from "./types";

export const useGetUserProfile = () => {
  return useQuery({
    queryFn: () => getUserProfile(),
    queryKey: [Query_Keys.GET_USER_PROFILE],
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ role, dataForm }: IUpdateProfile) =>
      updateProfile({ role, dataForm }),
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
    mutationFn: ({ password, password_confirmation }: IChangePassword) =>
      changePassword({ password, password_confirmation }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_USER_PROFILE],
      });
    },
  });
};
