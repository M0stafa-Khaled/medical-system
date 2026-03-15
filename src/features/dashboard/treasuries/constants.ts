import { IFormInput } from "@/shared/types";

export const TREASURY_FORM_INPUTS: IFormInput[] = [
  {
    name: "name",
    label: "اسم الخزنة",
    type: "text",
    placeholder: "اسم الخزنة",
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
