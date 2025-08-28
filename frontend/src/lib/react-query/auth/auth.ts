import Query_Keys from "@/enums/queryKeys";
import { ILogin, IRegister, IResetPassword } from "@/interfaces/auth/auth";
import {
  forgotPassword,
  getAllPermissions,
  login,
  logout,
  register,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "@/services/auth/auth";
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
    mutationFn: (token: string) => logout(token),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (token: string) => resendOtp(token),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ token, otp }: { token: string; otp: string }) =>
      verifyEmail({ token, otp }),
  });
};

export const useGetAllPermissions = (token: string) => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => getAllPermissions(token),
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
