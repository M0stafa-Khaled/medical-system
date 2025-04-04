import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import {
  IChangePassword,
  IResponseProfile,
  IUpdateProfile,
} from "@/interfaces/profile/profile";

export const getUserProfile = async (
  token: string
): Promise<IResponseProfile> => {
  const { data } = await axiosInstanceAPI.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateProfile = async ({
  role,
  token,
  dataForm,
}: IUpdateProfile): Promise<IStatusMsg> => {
  // * Doctor
  if (role === "doctor") {
    const formData = new FormData();
    if (dataForm.image) formData.append("image", dataForm.image);
    if (dataForm.signature) formData.append("signature", dataForm.signature);

    const { data } = await axiosInstanceAPI.post("/me", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  // * Patient
  if (role === "patient") {
    const formData = new FormData();
    if (dataForm.personal_image)
      formData.append("personal_image", dataForm.personal_image);
    if (dataForm.first_phone)
      formData.append("first_phone", dataForm.first_phone);
    if (dataForm.second_phone)
      formData.append("second_phone", dataForm.second_phone);
    if (dataForm.another_name)
      formData.append("another_name", dataForm.another_name);

    const { data } = await axiosInstanceAPI.post("/me", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  return {
    status: false,
    message: "This role is not supported",
  };
};

export const changePassword = async ({
  token,
  password,
  password_confirmation,
}: IChangePassword): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    "/password/update",
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
