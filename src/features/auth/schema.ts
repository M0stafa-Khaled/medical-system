import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/shared/utils/file";
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
    .email({ message: "ادخل بريد إلكتروني صالح" })
    .nonempty({ message: "البريد الإلكترونى مطلوب" }),
});

export const resetPasswordSchema = z
  .object({
    code: z
      .string({ message: "ادخل رمز التحقق" })
      .length(6, { message: "ادخل مز تحقق المكون من 6 ارقام" }),
    password: z
      .string({ message: "ادخل كلمة المرور الجديدة" })
      .min(8, { message: "يجب ان تكون كلمة المرور 8 احرف علي الاقل" }),
    password_confirmation: z.string({
      message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    path: ["password_confirmation"],
  });

export const registerSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .trim(),
  first_phone: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d+$/, "يجب ادخال رقم هاتف صالح"),
  personal_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .min(1, "رقم الهوية مطلوب")
    .max(20, "ادخل رقم هوية صالح"),
  gender: z.enum(["male", "female"], { message: "الجنس مطلوب" }),
  email: z
    .string({ message: "ادخل البريد الإلكتروني" })
    .email({ message: "ادخل بريد إلكتروني صالح" }),
  password: z
    .string({ message: "كلمة المرور مطلوبة" })
    .min(8, { message: "يجب ان تكون كلمة المرور 6 احرف علي الاقل" }),
  personal_image: z
    .instanceof(File, { message: "صورة الهوية مطلوبة" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "حجم الصورة يجب أن يكون أقل من 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png",
    }),
});
