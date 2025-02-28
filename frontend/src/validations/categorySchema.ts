import { z } from "zod";

const categorySchema = z.object({
  name: z.string({ message: "الاسم مطلوب" }).nonempty("الاسم مطلوب"),
});

export default categorySchema;
