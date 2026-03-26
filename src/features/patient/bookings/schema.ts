import { z } from "zod";

export const patientBookingSchema = z.object({
  clinic_id: z.string().min(1, "العيادة مطلوبة"),
  doctor_id: z.string().min(1, "الطبيب مطلوب"),
  working_day_id: z.string().min(1, "يوم العمل مطلوب"),
  doctor_action_id: z.string().min(1, "الخدمة مطلوبة"),
  date: z.string().min(1, "تاريخ الحجز مطلوب"),
  start_at: z.string().min(1, "وقت الحجز مطلوب"),
});

export type TPatientBookingFormValues = z.infer<typeof patientBookingSchema>;
