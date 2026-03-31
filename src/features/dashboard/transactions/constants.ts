import { IFormInput } from "@/shared/types";

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
    name: "visa_code",
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
    name: "transaction_code",
    label: "رقم الإيصال",
    type: "number",
    placeholder: "رقم الإيصال",
  },
  {
    name: "payment_method",
    label: "وسيلة الدفع",
    type: "select",
  },
  {
    name: "visa_code",
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
];
