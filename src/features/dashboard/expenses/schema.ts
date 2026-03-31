import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .nonempty({ message: "الاسم مطلوب" }),
  status: z.boolean().default(true),
  price: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(0, { message: "ادخل مبلغ صالح" }),
  category_id: z
    .string({ message: "التصنيف مطلوب" })
    .nonempty({ message: "التصنيف مطلوب" }),
  description: z.string({ message: "الملاحظات مطلوبة" }).optional(),
  date: z
    .string({ message: "التاريخ مطلوب" })
    .nonempty({ message: "التاريخ مطلوب" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "صيغة التاريخ يجب أن تكون YYYY-MM-DD" })
    .refine((val) => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const format = (d: Date) => 
        d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

      const todayStr = format(today);
      const yesterdayStr = format(yesterday);

      return val === todayStr || val === yesterdayStr;
    }, { message: "التاريخ يجب أن يكون اليوم أو أمس فقط" }),
});

export const cancelExpenseSchema = z.object({
  cancelled_info: z
    .string({ message: "السبب الإلغاء مطلوب" })
    .nonempty({ message: "السبب الإلغاء مطلوب" }),
});
