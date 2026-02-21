import { IFormInput } from "@/shared/types";

export const CHANGE_PASSWORD_INPUTS: IFormInput[] = [
  {
    label: "كلمة المرور الجديدة",
    name: "password",
    type: "password",
    placeholder: "كلمة المرور",
  },
  {
    label: "تأكيد كلمة المرور الجديدة",
    name: "password_confirmation",
    type: "password",
    placeholder: "تأكيد كلمة المرور",
  },
];

export const UPDATE_PROFILE_PATIENT_INPUTS: IFormInput[] = [
  {
    name: "first_phone",
    label: "رقم الهاتف الأول",
    placeholder: "ادخل رقم الهاتف",
    type: "text",
  },
  {
    name: "second_phone",
    label: "رقم الهاتف الثاني",
    placeholder: "ادخل رقم الهاتف الثاني",
    type: "text",
  },
  {
    name: "another_name",
    label: "اسم احد الاقارب",
    placeholder: "ادخل اسم احد الاقارب",
    type: "text",
  },
  {
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
];

export const UPDATE_PROFILE_DOCTOR_INPUTS: IFormInput[] = [
  {
    name: "image",
    label: "صورة شخصية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
  {
    name: "signature",
    label: "توقيع الطبيب",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
];
