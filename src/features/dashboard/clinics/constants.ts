import { IFormInput } from "@/shared/types";

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
