import { checkAuth, login, logout, resendOtp, verifyEmail } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

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
      verifyEmail({token, otp}),
  });
};
