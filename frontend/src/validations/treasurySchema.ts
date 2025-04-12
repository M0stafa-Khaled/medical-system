import { z } from "zod";

export const createTreasurySchema = z.object({
  name: z
    .string({ message: "اسم الخزينة مطلوب" })
    .nonempty({ message: "اسم الخزينة مطلوب" }),
  status: z.boolean().default(true),
});

export const transferTreasurySchema = z.object({
  from_treasury: z
    .string({ message: "الخزينة مطلوبة" })
    .nonempty({ message: "الخزينة مطلوبة" }),
  to_treasury: z
    .string({ message: "الخزينة مطلوبة" })
    .nonempty({ message: "الخزينة مطلوبة" }),
  amount: z.coerce
    .number({ message: "ادخل قيمة صالحة" })
    .min(1, { message: "يجب ان تكون القيمة علي الاقل 1" }),
});
