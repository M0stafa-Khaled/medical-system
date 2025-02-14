import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/utils/file";

const updateDoctorSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .trim(),
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
  register_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .trim()
    .min(1, "رقم الهوية مطلوب"),
  commission: z
    .string({ message: "العمولة مطلوبة" })
    .regex(/^(100|[0-9]{1,2}(\.[0-9]+)?)$/, "يجب ادخال عمولة صالحة")
    .trim(),
  status: z.boolean().default(true),
  email: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
      message: "البريد الإلكتروني غير صالح",
    }),
  gender: z.object(
    {
      value: z.string({ message: "النوع مطلوب" }),
      label: z.string({ message: "النوع مطلوب" }),
    },
    { message: "النوع مطلوب" }
  ),
  clinics: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "يجب اختيار عيادة واحدة على الأقل"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "كلمة المرور يجب أن تكون 8 حروف على الأقل",
    }),

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

export default updateDoctorSchema;
