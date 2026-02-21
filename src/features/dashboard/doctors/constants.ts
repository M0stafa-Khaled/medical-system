import { IFormInput } from "@/shared/types";

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
    label: "رقم الهاتف الثاني",
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
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
  {
    name: "signature",
    label: "توقيع الطبيب",
    type: "file",
    accept: "image/jpeg, image/png, image/jpg, image/svg",
  },
  {
    name: "status",
    label: "حالة الحساب",
    type: "switch",
  },
];

export const DOCTOR_ACTION_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الإجراء",
    type: "text",
    placeholder: "ادخل اسم الإجراء",
  },
  {
    name: "price",
    label: "السعر",
    type: "number",
    placeholder: "0",
  },
];

export const DOCTOR_WORKING_DAY_INPUTS: IFormInput[] = [
  {
    name: "day",
    label: "اليوم",
    type: "select",
  },
  {
    name: "max_visitors",
    label: "الحد الأقصى لعدد للحجوزات",
    type: "number",
    placeholder: "الحد الأقصى للحجوزات",
  },
  {
    name: "start_at",
    label: "بداية وقت العمل",
    type: "time",
    placeholder: "نهاية وقت العمل",
  },
  {
    name: "end_at",
    label: "نهاية وقت العمل",
    type: "time",
  },
  {
    name: "deuration",
    label: "مدة الكشف",
    type: "number",
    placeholder: "ادخل مدة الكشف",
  },
  {
    name: "clinic_id",
    label: "العيادة",
    type: "select",
  },
];
