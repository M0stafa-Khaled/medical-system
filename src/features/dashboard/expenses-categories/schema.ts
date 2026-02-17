import z from "zod";

export const expenseCategorySchema = z.object({
  name: z.string({ message: "الاسم مطلوب" }).nonempty("الاسم مطلوب"),
});
