import { z } from "zod";

const transferTreasurySchema = z.object({
  from_treasury: z
    .object(
      {
        value: z.string({ message: "الخزينة مطلوبة" }),
        label: z.string({ message: "الخزينة مطلوبة" }),
      },
      { message: "الخزينة مطلوبة" }
    )
    .refine((data) => data.value, { message: "الخزينة مطلوبة" }),
  to_treasury: z
    .object(
      {
        value: z.string({ message: "الخزينة مطلوبة" }),
        label: z.string({ message: "الخزينة مطلوبة" }),
      },
      { message: "الخزينة مطلوبة" }
    )
    .refine((data) => data.value, { message: "الخزينة مطلوبة" }),
  amount: z.coerce
    .number({ message: "ادخل قيمة صالحة" })
    .min(1, { message: "يجب ان تكون القيمة علي الاقل 1" }),
});

export default transferTreasurySchema;
