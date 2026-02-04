import { z } from "zod";

const dosageSchema = z.object({
  name: z
    .string({ message: "اسم الجرعة مطلوب" })
    .nonempty({ message: "اسم الجرعة مطلوب" }),
});

export default dosageSchema;
