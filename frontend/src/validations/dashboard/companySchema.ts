import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/file";
import { z } from "zod";

export const companySchema = z.object({
  name_manager: z
    .string({ message: "ادخل اسم صالح" })
    .nonempty("اسم المدير مطلوب"),
  phone_manager: z
    .string({ message: "ادخل رقم هاتف صالح" })
    .regex(/^\+?[0-9]{10,15}$/, "رقم الهاتف غير صالح"),
  logo: z.union([
    z.undefined(),
    z
      .instanceof(File, { message: "يجب أن يكون الملف صورة" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "حجم الصورة يجب أن يكون أقل من 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "يجب أن يكون نوع الملف .jpg, .jpeg, او .png ",
      }),
  ]),
});
