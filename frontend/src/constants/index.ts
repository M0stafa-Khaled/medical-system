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

export const CLINIC_FORM_INPUTS: IFormInput[] = [
  {
    label: "اسم العيادة",
    name: "name",
    type: "text",
    placeholder: "اسم العيادة",
  },
  {
    label: "حالة العيادة",
    name: "status",
    type: "switch",
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
    accept: "image/*",
  },
  {
    name: "signature",
    label: "توقيع الطبيب",
    type: "file",
    accept: "image/*",
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
    placeholder: "ادخل سعر الإجراء ",
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
    label: "الخزينة",
    type: "select",
  },
  {
    name: "image",
    label: "صورة شخصية",
    type: "file",
    accept: "image/*",
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
  {
    name: "status",
    label: "حالة الحساب",
    type: "switch",
  },
];

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
    name: "personal_image",
    label: "صورة الهوية",
    type: "file",
    accept: "image/*",
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

export const EXPENSE_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم المصروف",
    type: "text",
    placeholder: "اسم المصروف",
  },
  {
    name: "price",
    label: "المبلغ",
    type: "number",
    placeholder: "المبلغ",
  },
  {
    name: "status",
    label: "حالة المصروف",
    type: "switch",
  },
  {
    name: "category_id",
    label: "تصنيف المصروف",
    type: "select",
  },
];

export const TREASURY_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الخزينة",
    type: "text",
    placeholder: "اسم الخزينة",
  },
  {
    name: "status",
    label: "الحالة",
    type: "switch",
  },
];

export const TRANSFER_TREASURIES_FORM_INPUTS: IFormInput[] = [
  {
    name: "from_treasury",
    label: "من",
    type: "select",
  },
  {
    name: "to_treasury",
    label: "إلي",
    type: "select",
  },
];
