import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1, {
    message: "اسم العيادة مطلوب",
  }),
  virtual_number: z.coerce
    .number({
      message: "اسم العيادة مطلوب",
    })
    .optional(),
  status: z.boolean(),
});
