import { z } from "zod";

const clinicSchema = z.object({
  name: z.string().min(1, {
    message: "اسم العيادة مطلوب",
  }),
  skip: z.coerce
    .number({
      message: "اسم العيادة مطلوب",
    })
    .optional(),
  status: z.boolean(),
});

export default clinicSchema;
