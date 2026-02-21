import { IFormInput, TBookingStatus } from "@/shared/types";

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
