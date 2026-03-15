import { IFormInput } from "@/shared/types";

export const EMPLOYEE_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الموظف",
    placeholder: "ادخل اسم الموظف",
    type: "text",
  },
  {
    name: "role",
    label: "الدور",
    type: "select",
  },
  {
    name: "permissions",
    label: "الصلاحيات",
    type: "multiselect",
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
    name: "salary",
    label: "راتب الموظف",
    placeholder: "ادخل راتب الموظف",
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
    name: "job",
    label: "الوظيفة",
    placeholder: "ادخل الوظيفة",
    type: "text",
  },
  {
    name: "treasury_id",
    label: "الخزنة",
    type: "select",
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
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
  {
    name: "image",
    label: "صورة شخصية",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
];

export const ROLES: { value: string; label: string }[] = [
  {
    value: "admin",
    label: "مسؤول",
  },
  {
    value: "employee",
    label: "موظف",
  },
];
