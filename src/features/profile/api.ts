import axiosAPI from "@/shared/lib/axios";
import { type IStatusMsg } from "@/shared/types";
import { IChangePassword, IProfileRes, IUpdateProfile } from "./types";

export const getUserProfile = async (): Promise<IProfileRes> =>
  (await axiosAPI.get("/me")).data;

export const updateProfile = async ({
  role,
  dataForm,
}: IUpdateProfile): Promise<IStatusMsg> => {
  // * Doctor
  if (role === "doctor") {
    const formData = new FormData();
    if (dataForm.image) formData.append("image", dataForm.image);
    if (dataForm.signature) formData.append("signature", dataForm.signature);

    const { data } = await axiosAPI.post("/me", formData);
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

    const { data } = await axiosAPI.post("/me", formData);
    return data;
  }

  return {
    status: false,
    message: "You can't update your profile",
  };
};

export const changePassword = async ({
  password,
  password_confirmation,
}: IChangePassword): Promise<IStatusMsg> =>
  (
    await axiosAPI.post("/password/update", {
      password,
      password_confirmation,
    })
  ).data;
