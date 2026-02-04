import { IFormInput } from "@/interfaces";
import { TBookingStatus, TPaymentMethod } from "@/types";

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

export const CLINIC_FORM_INPUTS: IFormInput[] = [
  {
    label: "اسم العيادة",
    name: "name",
    type: "text",
    placeholder: "اسم العيادة",
  },
  {
    label: "تخطي حجز كل",
    name: "virtual_number",
    type: "number",
    placeholder: "تخطي حجز كل",
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

export const DAYS: {
  [key: string]: {
    en: string;
    ar: string;
  };
} = {
  saturday: { en: "saturday", ar: "السبت" },
  sunday: { en: "sunday", ar: "الأحد" },
  monday: { en: "monday", ar: "الاثنين" },
  tuesday: { en: "tuesday", ar: "الثلاثاء" },
  wednesday: { en: "wednesday", ar: "الأربعاء" },
  thursday: { en: "thursday", ar: "الخميس" },
  friday: { en: "friday", ar: "الجمعة" },
};

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
  {
    name: "amount",
    label: "المبلغ",
    type: "number",
  },
];

export const BOOKING_FORM_INPUTS: IFormInput[] = [
  {
    name: "clinic_id",
    label: "العيادة",
    type: "select",
  },
  {
    name: "doctor_id",
    label: "الطبيب",
    type: "select",
  },
  {
    name: "doctor_action_id",
    label: "الخدمة",
    type: "select",
  },
  {
    name: "working_day_id",
    label: "يوم الحجز",
    type: "select",
  },
  {
    name: "date",
    label: "تاريخ الحجز",
    type: "date",
  },
  {
    name: "start_at",
    label: "الأوقات المتاحة للحجز",
    type: "select",
  },
  {
    name: "patient_id",
    label: "المريض",
    type: "select",
  },
  {
    name: "status",
    label: "الحالة",
    type: "select",
  },
];

export const BOOKING_STATUS_OPTIONS: {
  label: string;
  value: TBookingStatus;
}[] = [
  {
    label: "قيد الانتظار",
    value: "pending",
  },
  {
    label: "لم  يحضر",
    value: "no-show",
  },
  {
    label: "منتهي",
    value: "ended",
  },
];

export const PAYMENT_METHODS: {
  label: string;
  value: TPaymentMethod;
}[] = [
  {
    label: "بطاقة بنكية",
    value: "visa",
  },
  {
    label: "نقدي",
    value: "cash",
  },
];

export const TRANSACTION_FORM_INPUTS: IFormInput[] = [
  {
    name: "doctor_actions",
    label: "الخدمة",
    type: "select",
  },
  {
    name: "payment_method",
    label: "وسيلة الدفع",
    type: "select",
  },
  {
    name: "visa_code", // Only for visa
    label: "رقم العملية",
    type: "text",
    placeholder: "رقم العملية",
  },
  {
    name: "price",
    label: "المبلغ",
    type: "number",
    placeholder: "المبلغ",
  },
];

export const PATIENT_PAYMENT_FORM_INPUTS: IFormInput[] = [
  {
    name: "patient_id",
    label: "المريض",
    type: "select",
  },
  {
    name: "payment_method",
    label: "وسيلة الدفع",
    type: "select",
  },
  {
    name: "visa_code", // Only for visa
    label: "رقم العملية",
    type: "text",
    placeholder: "رقم العملية",
  },
  {
    name: "amount",
    label: "المبلغ",
    type: "number",
    placeholder: "المبلغ",
  },
  {
    name: "transaction_code",
    label: "رقم الإيصال",
    type: "number",
    placeholder: "رقم الإيصال",
  },
];

// Patient Dashboard
export const PATIENT_BOOKING_FORM_INPUTS: IFormInput[] = [
  {
    name: "clinic_id",
    label: "العيادة",
    type: "select",
  },
  {
    name: "doctor_id",
    label: "الطبيب",
    type: "select",
  },
  {
    name: "doctor_action_id",
    label: "الخدمة",
    type: "select",
  },
  {
    name: "working_day_id",
    label: "يوم الحجز",
    type: "select",
  },
  {
    name: "date",
    label: "تاريخ الحجز",
    type: "date",
  },
  {
    name: "start_at",
    label: "الأوقات المتاحة للحجز",
    type: "select",
  },
];

export const PRESCRIPTIONS_INPUTS: IFormInput[] = [
  {
    name: "clinic_id",
    label: "العيادة",
    type: "select",
  },
  {
    name: "doctor_id",
    label: "الطبيب",
    type: "select",
  },
  {
    name: "patient_id",
    label: "المريض",
    type: "select",
  },
  {
    name: "prescription_date",
    label: "تاريخ الروشتة",
    type: "prescription_date",
  },
  {
    name: "note",
    label: "ملاحظات",
    type: "text",
    placeholder: "ملاحظات",
  },
];

export const DOCTOR_PRESCRIPTIONS_INPUTS: IFormInput[] = [
  {
    name: "clinic_id",
    label: "العيادة",
    type: "select",
  },
  {
    name: "patient_id",
    label: "المريض",
    type: "select",
  },
  {
    name: "prescription_date",
    label: "تاريخ الروشتة",
    type: "prescription_date",
  },
  {
    name: "note",
    label: "ملاحظات",
    type: "text",
    placeholder: "ملاحظات",
  },
];

export const PRESCRIPTIONS_TYPES = [
  { label: "أشعة", value: "scan" },
  { label: "دواء", value: "dosage" },
  { label: "تحليل", value: "analysis" },
];
