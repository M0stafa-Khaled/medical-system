import axiosInstanceAPI from "@/config/axios.config";
import { IResponseProfile } from "@/interfaces/profile/profile";

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
