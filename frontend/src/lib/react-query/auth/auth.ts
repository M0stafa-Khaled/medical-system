import {
  checkAuth,
  getAllPermissions,
  login,
  logout,
  resendOtp,
  verifyEmail,
} from "@/services/auth/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => login(user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: (token: string) => logout(token),
  });
};

export const useCheckAuth = () => {
  return useMutation({
    mutationFn: (token: string) => checkAuth(token),
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
