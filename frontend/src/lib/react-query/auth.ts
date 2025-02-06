import { login, logout } from "@/api/auth";
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
