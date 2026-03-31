import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/shared/utils/file";

export const createPatientSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .trim(),
  another_name: z.string({ message: "الاسم مطلوب" }).trim().optional(),
  personal_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .min(1, "رقم الهوية مطلوب")
    .max(20, "ادخل رقم هوية صالح"),
  first_phone: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d+$/, "يجب ادخال رقم هاتف صالح"),
  second_phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "يجب ادخال رقم هاتف صالح",
    }),
  file_code: z.string({ message: "رقم الملف مطلوب" }).trim(),
  status: z.boolean().default(true),
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .trim()
    .email("ادخل بريد إلكترونى صالح"),
  password: z
    .string({ message: "كلمة المرور مطلوبة" })
    .min(8, "كلمة المرور يجب ان تكون 8 حروف على الاقل"),
  description: z.string({ message: "الملاحظات مطلوبة" }).optional(),
  info_status: z.string({ message: "الملاحظات مطلوبة" }).optional(),
  gender: z
    .string({ message: "النوع مطلوب" })
    .nonempty({ message: "النوع مطلوب" }),
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

export const updatePatientSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .trim(),
  another_name: z.string({ message: "الاسم مطلوب" }).trim().optional(),
  personal_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .trim()
    .min(1, "رقم الهوية مطلوب")
    .max(20, "ادخل رقم هوية صالح"),
  first_phone: z
    .string({ message: "رقم الهاتف مطلوب" })
    .trim()
    .regex(/^\d+$/, "يجب ادخال رقم هاتف صالح"),
  second_phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "يجب ادخال رقم هاتف صالح",
    }),
  file_code: z.string({ message: "رقم الملف مطلوب" }).trim(),
  status: z.boolean().default(true),
  description: z.string({ message: "الملاحظات مطلوبة" }).optional(),
  info_status: z.string({ message: "الملاحظات مطلوبة" }).optional(),
  email: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
      message: "البريد الإلكتروني غير صالح",
    }),
  gender: z
    .string({ message: "النوع مطلوب" })
    .nonempty({ message: "النوع مطلوب" }),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "كلمة المرور يجب أن تكون 8 حروف على الأقل",
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
