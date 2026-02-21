import { IFormInput } from "@/shared/types";

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
