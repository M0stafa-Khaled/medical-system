import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/file";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .email({ message: "ادخل بريد إلكترونى صالح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export const doctorUpdateProfileSchema = z.object({
  image: z.union([
    z.undefined(),
    z
      .instanceof(File, { message: "يجب أن يكون الملف صورة" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "حجم الصورة يجب أن يكون أقل من 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png or .webp",
      }),
  ]),
  signature: z.union([
    z.undefined(),
    z
      .instanceof(File, { message: "يجب أن يكون الملف صورة" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "حجم الصورة يجب أن يكون أقل من 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png or .webp",
      }),
  ]),
});

export const patientUpdateProfileSchema = z.object({
  another_name: z.string({ message: "الاسم مطلوب" }).trim().optional(),
  first_phone: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d+$/, "يجب ادخال رقم هاتف صالح")
    .optional(),
  second_phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "يجب ادخال رقم هاتف صالح",
    }),
  personal_image: z.union([
    z.undefined(),
    z
      .instanceof(File, { message: "يجب أن يكون الملف صورة" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "حجم الصورة يجب أن يكون أقل من 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png or .webp",
      }),
  ]),
});

export const changePasswordSchema = z.object({
  password: z
    .string({ message: "ادخل كلمة المرور الجديدة" })
    .nonempty({
      message: "كلمة المرور مطلوبة",
    })
    .min(8, { message: "يجب ان تكون كلمة المرور 6 احرف علي الاقل" }),
  password_confirmation: z.string({
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  }),
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
