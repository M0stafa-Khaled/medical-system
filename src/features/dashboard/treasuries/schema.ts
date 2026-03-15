import { z } from "zod";

export const createTreasurySchema = z.object({
  name: z
    .string({ message: "اسم الخزنة مطلوب" })
    .nonempty({ message: "اسم الخزنة مطلوب" }),
  status: z.boolean().default(true),
});

export const transferTreasurySchema = z.object({
  from_treasury: z
    .string({ message: "الخزنة مطلوبة" })
    .nonempty({ message: "الخزنة مطلوبة" }),
  to_treasury: z
    .string({ message: "الخزنة مطلوبة" })
    .nonempty({ message: "الخزنة مطلوبة" }),
  amount: z.coerce
    .number({ message: "ادخل قيمة صالحة" })
    .min(1, { message: "يجب ان تكون القيمة علي الاقل 1" }),
});
