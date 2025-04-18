import { z } from "zod";

const prescriptionSchema = z.object({
  prescriptables: z
    .array(
      z.object({
        type: z.enum(["scan", "dosage", "analysis"]),
        name: z.string().min(1, "الاسم مطلوب"),
        drug_name: z.string().optional(),
      })
    )
    .min(1, { message: "يرجي إضافة عنصر واحد علي الاقل" }),

  prescription_date: z.string({ message: "التاريخ مطلوب" }).nonempty({
    message: "التاريخ مطلوب",
  }),
  note: z.string().optional(),
  clinic_id: z.string().optional(),
  patient_id: z.string().optional(),
  doctor_id: z.string().optional(),
});

export default prescriptionSchema;
