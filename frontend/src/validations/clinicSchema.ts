import { z } from "zod";

const clinicSchema = z.object({
  name: z.string().min(1, {
    message: "اسم العيادة مطلوب",
  }),
});

export default clinicSchema;
