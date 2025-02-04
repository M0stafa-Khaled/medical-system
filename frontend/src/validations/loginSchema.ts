import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .email({ message: "ادخل بريد إلكترونى صالح" }),
  password: z.string({ message: "كلمة المرور مطلوبة" }),
});

export default loginSchema;
