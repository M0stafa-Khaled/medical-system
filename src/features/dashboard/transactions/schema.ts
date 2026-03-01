import { z } from "zod";

export const createTransactionSchema = z.object({
  doctor_actions: z.array(z.string()).min(1, "يجب اختيار خدمة واحدة علي الأقل"),
  price: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(0, { message: "لا يمكن اضافة تحصيل بمبلغ 0 او اقل" }),
  payment_method: z.enum(["cash", "visa"], { message: "وسيلة الدفع مطلوبة" }),
  visa_code: z.coerce.number({ message: "ادخل رقم عملية صالح" }).optional(),
});

export const createPatientPaymentSchema = z.object({
  amount: z.coerce
    .number({ message: "ادخل مبلغ صالح" })
    .min(0, { message: "لا يمكن اضافة تحصيل بمبلغ 0 او اقل" }),
  payment_method: z.enum(["cash", "visa"], { message: "وسيلة الدفع مطلوبة" }),
  visa_code: z.string({ message: "ادخل رقم عملية صالح" }).optional(),
  transaction_code: z
    .string({ message: "ادخل رقم الإيصال" })
    .nonempty({ message: "ادخل رقم الإيصال" }),
  patient_id: z
    .string({ message: "المريض مطلوب" })
    .nonempty({ message: "المريض مطلوب" }),
});
