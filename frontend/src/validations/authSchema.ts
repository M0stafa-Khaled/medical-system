import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .email({ message: "ادخل بريد إلكترونى صالح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "ادخل البريد الإلكتروني" })
    .email({ message: "ادخل بريد إلكتروني صالح" }),
});

export const resetPasswordSchema = z
  .object({
    code: z
      .string({ message: "ادخل رمز التحقق" })
      .length(6, { message: "ادخل مز تحقق المكون من 6 ارقام" }),
    password: z
      .string({ message: "ادخل كلمة المرور الجديدة" })
      .min(8, { message: "يجب ان تكون كلمة المرور 6 احرف علي الاقل" }),
    password_confirmation: z.string({
      message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    path: ["password_confirmation"],
  });
