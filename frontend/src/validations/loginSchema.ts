import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "البريد الإلكترونى مطلوب" })
    .email({ message: "ادخل بريد إلكترونى صالح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
});

export default loginSchema;
