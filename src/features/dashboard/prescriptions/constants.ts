import { IFormInput } from "@/shared/types";

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
