import { z } from "zod";

const doctorActionSchema = z.object({
  name: z.string().nonempty({
    message: "اسم الإجراء مطلوب",
  }),
  price: z.coerce.number({
    message: "ادخل سعر إجراء صالح",
  }),
});

export default doctorActionSchema;
