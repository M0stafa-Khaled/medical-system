import { IFormInput } from "@/shared/types";

export const LOGIN_FORM_INPUTS: IFormInput[] = [
  {
    label: "البريد الإلكتروني",
    placeholder: "البريد الإلكتروني",
    name: "email",
    type: "text",
  },
  {
    label: "كلمة المرور",
    placeholder: "كلمة المرور",
    name: "password",
    type: "password",
  },
];

export const REGISTER_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "الاسم بالكامل",
    placeholder: "ادخل الاسم بالكامل",
    type: "text",
  },
  {
    name: "email",
    label: "البريد الإلكتروني",
    placeholder: "ادخل البريد الإلكتروني",
    type: "text",
  },
  {
    name: "password",
    label: "كلمة المرور",
    placeholder: "ادخل كلمة المرور",
    type: "password",
  },
  {
    name: "personal_id",
    label: "رقم الهوية",
    placeholder: "ادخل رقم الهوية",
    type: "text",
  },
  {
    name: "first_phone",
    label: "رقم الهاتف الأول",
    placeholder: "ادخل رقم الهاتف",
    type: "text",
  },
  {
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
];

export const RESET_PASSWORD_FORM_INPUTS: IFormInput[] = [
  {
    label: "رمز التحقق",
    placeholder: "رمز التحقق",
    name: "code",
    type: "text",
  },
  {
    label: "كلمة المرور الجديدة",
    placeholder: "كلمة المرور",
    name: "password",
    type: "password",
  },
  {
    label: "تأكيد كلمة المرور الجديدة",
    placeholder: "تأكيد كلمة المرور",
    name: "password_confirmation",
    type: "password",
  },
];
