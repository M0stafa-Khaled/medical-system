import axiosInstanceAPI from "@/config/axios.config";
import {
  IChangePassword,
  IResponseProfile,
  IUpdateProfile,
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

export const updateProfile: ({
  token,
  role,
  dataForm,
}: IUpdateProfile) => Promise<{
  status: boolean;
  message: string;
}> = async ({ role, token, dataForm }) => {
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
};

export const changePassword: ({
  token,
  password,
  password_confirmation,
}: IChangePassword) => Promise<{
  status: boolean;
  message: string;
}> = async ({ password, password_confirmation, token }) => {
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
