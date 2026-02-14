import Query_Keys from "@/enums/queryKeys";
import { ILogin, IRegister, IResetPassword } from "./types";
import {
  checkAuth,
  forgotPassword,
  getAllPermissions,
  login,
  logout,
  register,
  resendOtp,
  resetPassword,
  verifyAccount,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: ILogin) => login(user),
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IRegister) => register(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENTS],
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

export const useCheckAuth = () => {
  return useMutation({
    mutationFn: () => checkAuth(),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: () => resendOtp(),
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: ({ otp }: { otp: string }) => verifyAccount({ otp }),
  });
};

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => getAllPermissions(),
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ code, password, password_confirmation }: IResetPassword) =>
      resetPassword({
        code,
        password,
        password_confirmation,
      }),
  });
