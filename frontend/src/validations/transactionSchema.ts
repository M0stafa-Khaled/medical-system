import { z } from "zod";

const transactionSchema = z.object({
  price: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(1, { message: "لا يمكن اضافى تحصيل بمبلغ 0 او اقل" }),
  payment_method: z.object(
    {
      label: z.string({ message: "وسيلى الدفع مطلوبة" }),
      value: z.string({ message: "وسيلى الدفع مطلوبة" }),
    },
    {
      message: "وسيلة الدفع مطلوبة",
    }
  ),
});

export default transactionSchema;
