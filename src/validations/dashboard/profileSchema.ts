import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/file";
import { z } from "zod";

export const doctorUpdateProfileSchema = z.object({
  image: z.union([
    z.undefined(),
    z
      .instanceof(File, { message: "يجب أن يكون الملف صورة" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "حجم الصورة يجب أن يكون أقل من 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png",
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
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png",
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
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, .png",
      }),
  ]),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string({ message: "ادخل كلمة المرور الجديدة" })
      .nonempty({
        message: "كلمة المرور مطلوبة",
      })
      .min(8, { message: "يجب ان تكون كلمة المرور 6 احرف علي الاقل" }),
    password_confirmation: z.string({
      message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
    path: ["password_confirmation"],
  });
