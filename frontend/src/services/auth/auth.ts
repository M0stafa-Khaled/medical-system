import axiosAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import {
  ILogin,
  ILoginRes,
  IRegister,
  IRegisterRes,
  ICheckAuth,
  IResetPassword,
  IPermissionsRes,
} from "@/interfaces/auth/auth";

export const login: (user: ILogin) => Promise<ILoginRes> = async ({
  email,
  password,
}) => {
  const { data } = await axiosAPI.post("/auth", {
    slug: import.meta.env.VITE_SLUG,
    email,
    password,
  });
  return data;
};

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

export const logout: (token: string) => Promise<IStatusMsg> = async (token) => {
  const { data } = await axiosAPI.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const checkAuth: (token: string) => Promise<ICheckAuth> = async (
  token
) => {
  const { data } = await axiosAPI.post(
    "/check-auth",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const resendOtp: (token: string) => Promise<IStatusMsg> = async (
  token
) => {
  const { data } = await axiosAPI.post(
    "/email/verification-notification",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const verifyEmail: ({
  token,
  otp,
}: {
  token: string;
  otp: string;
}) => Promise<IStatusMsg> = async ({ token, otp }) => {
  const { data } = await axiosAPI.post(
    "email/verify",
    {
      code: otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const forgotPassword = async (email: string): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post("/password/confirmation-notification", {
    email,
    slug: import.meta.env.VITE_SLUG,
  });
  return data;
};

export const resetPassword = async ({
  code,
  password,
  password_confirmation,
}: IResetPassword): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post("/password/reset", {
    code,
    password,
    password_confirmation,
  });
  return data;
};

export const getAllPermissions: (
  token: string
) => Promise<IPermissionsRes> = async (token) => {
  const { data } = await axiosAPI.get("/permissions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
