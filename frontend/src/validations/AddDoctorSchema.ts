import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/utils/file";

const AddDoctorSchema = z.object({
  name: z
    .string({ message: "الاسم مطلوب" })
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .trim(),
  personal_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .min(1, "رقم الهوية مطلوب")
    .max(20, "ادخل رقم هوية صالح"),
  first_phone: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d+$/, "يجب ادخال رقم هاتف صالح"),
  second_phone: z.string().optional().or(z.literal("")),
  register_id: z
    .string({ message: "رقم الهوية مطلوب" })
    .min(1, "رقم الهوية مطلوب"),
  commission: z
    .string({ message: "العمولة مطلوبة" })
    .regex(/^(100|[0-9]{1,2}(\.[0-9]+)?)$/, "يجب ادخال عمولة صالحة")
    .trim(),
  status: z.boolean().default(true),
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .trim()
    .email("ادخل بريد إلكترونى صالح"),
  password: z
    .string({ message: "كلمة المرور مطلوبة" })
    .min(8, "كلمة المرور يجب ان تكون 8 حروف على الاقل"),
  gender: z.object(
    {
      value: z.string({ message: "النوع مطلوب" }),
      label: z.string({ message: "النوع مطلوب" }),
    },
    { message: "النوع مطلوب" }
  ),
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
  clinics: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "يجب اختيار عيادة واحدة على الأقل"),
});

export default AddDoctorSchema;
