import { z } from "zod";

export const createTransactionSchema = z.object({
  doctor_actions: z
    .array(
      z.object({
        value: z.string({
          message: "الخدمة مطلوبة",
        }),
        label: z.string({
          message: "الخدمة مطلوبة",
        }),
      }),
      {
        message: "الخدمة مطلوبة",
      }
    )
    .min(1, "يجب اختيار خدمة واحدة علي الأقل"),
  price: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(1, { message: "لا يمكن اضافة تحصيل بمبلغ 0 او اقل" }),
  payment_method: z.object(
    {
      label: z.string({ message: "وسيلى الدفع مطلوبة" }),
      value: z.string({ message: "وسيلى الدفع مطلوبة" }),
    },
    {
      message: "وسيلة الدفع مطلوبة",
    }
  ),
  visa_code: z.coerce.number({ message: "ادخل رقم عملية صالح" }).optional(),
});

export const createPatientPaymentSchema = z.object({
  amount: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(1, { message: "لا يمكن اضافة تحصيل بمبلغ 0 او اقل" }),
  payment_method: z.object(
    {
      label: z.string({ message: "وسيلى الدفع مطلوبة" }),
      value: z.string({ message: "وسيلى الدفع مطلوبة" }),
    },
    {
      message: "وسيلة الدفع مطلوبة",
    }
  ),
  visa_code: z.string({ message: "ادخل رقم عملية صالح" }).optional(),
  transaction_code: z
    .string({ message: "ادخل رقم الإيصال" })
    .nonempty({ message: "ادخل رقم الإيصال" }),
  patient_id: z
    .object(
      {
        label: z
          .string({ message: "المريض مطلوب" })
          .nonempty({ message: "المريض مطلوب" }),
        value: z
          .string({ message: "المريض مطلوب" })
          .nonempty({ message: "المريض مطلوب" }),
      },
      {
        message: "المريض مطلوب",
      }
    )
    .refine((data) => data.value, {
      message: "المريض مطلوب",
    }),
});
