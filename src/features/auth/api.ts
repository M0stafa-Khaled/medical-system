import axiosAPI from "@/config/axios.config";
import { IStatusMsg } from "@/shared/types";
import {
  ILogin,
  ILoginRes,
  IRegister,
  IRegisterRes,
  ICheckAuth,
  IResetPassword,
  IPermissionsRes,
} from "./types";

export const login = async ({ email, password }: ILogin): Promise<ILoginRes> =>
  (
    await axiosAPI.post("/auth", {
      slug: import.meta.env.VITE_SLUG,
      email,
      password,
    })
  ).data;

export const register = async (user: IRegister): Promise<IRegisterRes> => {
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("first_phone", user.first_phone);
  formData.append("personal_id", user.personal_id);
  formData.append("gender", user.gender);
  formData.append("personal_image", user.personal_image);
  if (user.second_phone) formData.append("second_phone", user.second_phone);
  if (user.another_name) formData.append("another_name", user.another_name);

  const { data } = await axiosAPI.post("/register", formData, {
    headers: {
      slug: import.meta.env.VITE_SLUG,
    },
  });
  return data;
};

export const logout = async (): Promise<IStatusMsg> =>
  (await axiosAPI.post("/logout")).data;

export const checkAuth = async (): Promise<ICheckAuth> =>
  (await axiosAPI.post("/check-auth")).data;

export const resendOtp = async (): Promise<IStatusMsg> =>
  (await axiosAPI.post("/email/verification-notification")).data;

export const verifyAccount = async ({
  otp,
}: {
  otp: string;
}): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/email/verify", {
      code: otp,
    })
  ).data;

export const forgotPassword = async (email: string): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/password/confirmation-notification", {
      email,
      slug: import.meta.env.VITE_SLUG,
    })
  ).data;

export const resetPassword = async ({
  code,
  password,
  password_confirmation,
}: IResetPassword): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/password/reset", {
      code,
      password,
      password_confirmation,
    })
  ).data;

export const getAllPermissions = async (): Promise<IPermissionsRes> =>
  (await axiosAPI.get("/permissions")).data;
