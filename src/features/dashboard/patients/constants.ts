import { IFormInput } from "@/shared/types";

export const PATIENT_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم المريض",
    placeholder: "ادخل اسم المريض",
    type: "text",
  },
  {
    name: "another_name",
    label: "اسم احد الاقارب",
    placeholder: "ادخل اسم احد الاقارب",
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
    label: "رقم الهاتف الثاني",
    placeholder: "ادخل رقم الهاتف الثاني",
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
    name: "description",
    label: "ملاحظات",
    placeholder: "ادخل ملاحظات",
    type: "text",
  },
  {
    name: "gender",
    label: "النوع",
    type: "select",
  },
  {
    name: "status",
    label: "حالة الحساب",
    type: "switch",
  },
  {
    name: "info_status",
    label: "ملاحظات حالة الحساب",
    type: "text",
    placeholder: "ادخل ملاحظات",
  },
  {
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
];
