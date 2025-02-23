import axiosInstanceAPI from "@/config/axios.config";
import {
  IAuthResponse,
  ICheckAuth,
  IResponsePermissions,
} from "@/interfaces/auth";

export const getAllPermissions: (
  token: string
) => Promise<IResponsePermissions> = async (token) => {
  const { data } = await axiosInstanceAPI.get("/permissions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const login: (user: {
  email: string;
  password: string;
}) => Promise<IAuthResponse> = async ({ email, password }) => {
  const { data } = await axiosInstanceAPI.post("/auth", {
    email,
    password,
  });
  return data;
};

export const logout: (token: string) => Promise<IAuthResponse> = async (
  token
) => {
  const { data } = await axiosInstanceAPI.post(
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
  const { data } = await axiosInstanceAPI.post(
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

export const resendOtp: (token: string) => Promise<{
  status: boolean;
  message: string;
}> = async (token) => {
  const { data } = await axiosInstanceAPI.post(
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
}) => Promise<{
  status: boolean;
  message: string;
}> = async ({ token, otp }) => {
  const { data } = await axiosInstanceAPI.post(
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
