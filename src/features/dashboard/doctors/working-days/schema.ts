import { z } from "zod";

export const doctorWorkingDaySchema = z.object({
  day: z
    .string({ message: "اليوم مطلوب" })
    .nonempty({ message: "اليوم مطلوب" }),
  clinic_id: z
    .string({ message: "العيادة مطلوبة" })
    .nonempty({ message: "العيادة مطلوبة" }),
  deuration: z.coerce
    .number({
      message: "ادخل مدة كشف صالحة",
    })
    .min(1, { message: "ادخل مدة كشف صالحة" }),
  max_visitors: z.coerce
    .number({
      message: "ادخل حد اقصى صالح",
    })
    .min(1, { message: "ادخل حد اقصى صالح" }),
  start_at: z
    .string({ message: "وقت البدء مطلوب" })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "ادخل وقت صالح (مثال: 2:30)",
    }),
  end_at: z
    .string({ message: "وقت البدء مطلوب" })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "ادخل وقت صالح (مثال: 5:30)",
    }),
});

export const doctorActionSchema = z.object({
  name: z.string().nonempty({
    message: "اسم الإجراء مطلوب",
  }),
  price: z.coerce
    .number({
      message: "ادخل سعر إجراء صالح",
    })
    .min(0, { message: "ادخل سعر إجراء صالح" }),
});
