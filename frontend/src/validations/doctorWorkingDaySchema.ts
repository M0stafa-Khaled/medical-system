import { z } from "zod";

const doctorWorkingDaySchema = z.object({
  day: z.object(
    {
      value: z.string({ message: "اليوم مطلوب" }),
      label: z.string({ message: "اليوم مطلوب" }),
    },
    { message: "اليوم مطلوب" }
  ),
  clinic_name: z.object(
    {
      value: z.string({ message: "العيادة مطلوبة" }),
      label: z.string({ message: "العيادة مطلوبة" }),
    },
    { message: "العيادة مطلوبة" }
  ),
  deuration: z.coerce
    .number({
      message: "ادخل مدة كشف صالحة",
    })
    .min(0, { message: "ادخل مدة كشف صالحة" }),
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

export default doctorWorkingDaySchema;
