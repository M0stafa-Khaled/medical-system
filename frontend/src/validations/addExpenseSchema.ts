import { z } from "zod";

const addExpenseSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .nonempty({ message: "الاسم مطلوب" })
    .trim(),
  status: z.boolean().default(true),
  price: z.coerce.number({
    message: "ادخل قمية صالحة",
  }),
  category_id: z.object(
    {
      value: z.string({ message: "التصنيف مطلوب" }),
      label: z.string({ message: "التصنيف مطلوب" }),
    },
    { message: "التصنيف مطلوب" }
  ),
  description: z.string({ message: "الملاحظات مطلوبة" }).optional(),
});

export default addExpenseSchema;
