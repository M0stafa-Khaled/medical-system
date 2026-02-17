import { z } from "zod";

export const dosageSchema = z.object({
  name: z
    .string({ message: "اسم الجرعة مطلوب" })
    .nonempty({ message: "اسم الجرعة مطلوب" }),
});
