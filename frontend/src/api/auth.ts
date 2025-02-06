import axiosInstanceAPI from "@/config/axios.config";
import { IAuthResponse } from "@/interfaces";

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
  token: string
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
