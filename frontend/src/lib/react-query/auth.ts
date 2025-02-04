import { loginAdmin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string; role: string }) =>
      loginAdmin(user),
  });
};
