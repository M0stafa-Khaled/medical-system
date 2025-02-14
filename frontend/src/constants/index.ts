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

export const DOCTOR_FORM_INPUTS: IFormInput[] = [
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
    name: "register_id",
    label: "رقم القيد",
    placeholder: "ادخل رقم ",
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
    label: "حالة الحساب",
    type: "switch",
  },
  {
    name: "clinics",
    label: "العيادة",
    type: "clinics",
  },
  {
    name: "gender",
    label: "النوع",
    type: "gender",
  },
  {
    name: "image",
    label: "صورة شخصية",
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

export const EMPLOYEE_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الموظف",
    placeholder: "ادخل اسم الموظف",
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
    name: "status",
    label: "حالة الحساب",
    type: "switch",
  },
  {
    name: "gender",
    label: "النوع",
    type: "select",
  },
  {
    name: "role",
    label: "الدور",
    type: "select",
  },
  {
    name: "image",
    label: "صورة شخصية",
    type: "file",
    accept: "image/*",
  },
  {
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/*",
  },
];
export const PATIENT_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم المريض",
    placeholder: "ادخل اسم الموظف",
    type: "text",
  },
  {
    name: "another_name",
    label: "اسم أخر",
    placeholder: "ادخل اسم أخر",
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
    label: "الوصف",
    placeholder: "ادخل الوصف",
    type: "text",
  },
  {
    name: "status",
    label: "حالة الحساب",
    type: "switch",
  },
  {
    name: "gender",
    label: "النوع",
    type: "select",
  },
  {
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/*",
  },
];

export const GENDER: { value: string; label: string }[] = [
  {
    value: "male",
    label: "ذكر",
  },
  {
    value: "female",
    label: "انثى",
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
