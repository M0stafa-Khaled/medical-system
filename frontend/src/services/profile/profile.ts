import axiosInstanceAPI from "@/config/axios.config";
import {
  IChangePassword,
  IResponseProfile,
} from "@/interfaces/profile/profile";

export const getUserProfile: (
  token: string
) => Promise<IResponseProfile> = async (token) => {
  const { data } = await axiosInstanceAPI.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateProfile = async () => {};

export const changePassword: ({
  token,
  password,
  password_confirmation,
}: IChangePassword) => Promise<{
  status: boolean;
  message: string;
}> = async ({ password, password_confirmation, token }) => {
  const { data } = await axiosInstanceAPI.post(
    "/me",
    {
      password,
      password_confirmation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
