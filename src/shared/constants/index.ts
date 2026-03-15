import { IFormInput } from "@/shared/types";
import { TPaymentMethod } from "@/shared/types";

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

export const ROUTES_NAME: Record<string, string> = {
  dashboard: "الرئيسية",
  doctor: "الرئيسية",
  settings: "الإعدادات",
  clinics: "العيادات",
  doctors: "الأطباء",
  doctorTransactions: "معاملات الأطباء",
  patientsBalances: "كشف حسابات المرضى",
  "working-days": "ايام العمل",
  create: "إضافة",
  update: "تعديل",
  employees: "الموظفين",
  patients: "المرضى",
  drugs: "الأدوية",
  treasuries: "الخزائن",
  expenses: "المصروفات",
  "expenses-categories": "تصنيفات المصروفات",
  bookings: "الحجوزات",
  transactions: "الإيرادات",
  "last-visits": "أخر الزيارات",
  analysis: "التحاليل",
  scans: "الأشعات",
  dosages: "الجرعات",
  prescriptions: "الروشتات",
  reports: "التقارير",
  transfers: "التحويلات",
  "patient-balances": "حسابات المرضى",
  transactionsReports: "تقارير الإيرادات",
  bookingsReports: "تقارير الحجوزات",
  expensesReports: "تقارير المصروفات",
  transfersReports: "تقارير التحويلات",
  prescriptionsReports: "تقارير الروشتات",
  treasuriesReports: "تقارير الخزائن",
  patientsReports: "تقارير المرضى",
  patientBalancesReports: "تقارير حسابات المرضى",
  notifications: "الإشعارات",
};
