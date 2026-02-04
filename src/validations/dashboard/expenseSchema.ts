import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .nonempty({ message: "الاسم مطلوب" }),
  status: z.boolean().default(true),
  price: z.coerce
    .number({
      message: "ادخل مبلغ صالح",
    })
    .min(0, { message: "ادخل مبلغ صالح" }),
  category_id: z
    .string({ message: "التصنيف مطلوب" })
    .nonempty({ message: "التصنيف مطلوب" }),
  description: z.string({ message: "الملاحظات مطلوبة" }).optional(),
});

export const cancelExpenseSchema = z.object({
  cancelled_info: z
    .string({ message: "السبب الإلغاء مطلوب" })
    .nonempty({ message: "السبب الإلغاء مطلوب" }),
});

export const expenseCategorySchema = z.object({
  name: z.string({ message: "الاسم مطلوب" }).nonempty("الاسم مطلوب"),
});
