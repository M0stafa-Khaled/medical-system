import { IFormInput } from "@/interfaces";

export const LOGIN_FORM_INPUTS: IFormInput[] = [
  {
    label: "البريد الإلكتروني",
    name: "email",
    type: "text",
  },
  {
    label: "كلمة المرور",
    name: "password",
    type: "password",
  },
];

export const ADD_DOCTOR_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الطبيب",
    placeholder: "ادخل اسم الطبيب",
    type: "text",
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
    name: "second_phone",
    label: "رقم الهاتف الثاني (اختياري)",
    placeholder: "ادخل رقم الهاتف الثاني",
    type: "text",
  },
  {
    name: "commission",
    label: "نسبة العمولة (%)",
    placeholder: "ادخل نسبة العمولة",
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
    name: "status",
    label: "حالة الطبيب",
    type: "switch",
  },
  {
    name: "image",
    label: "صورة الطبيب",
    type: "file",
    accept: "image/*",
  },
  {
    name: "signature",
    label: "توقيع الطبيب",
    type: "file",
    accept: "image/*",
  },
];
