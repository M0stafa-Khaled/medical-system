import { z } from "zod";

const patientBookingSchema = z.object({
  clinic_id: z
    .string({ message: "العيادة مطلوبة" })
    .nonempty({ message: "العيادة مطلوبة" }),
  doctor_id: z
    .string({ message: "الطبيب مطلوب" })
    .nonempty({ message: "الطبيب مطلوب" }),
  working_day_id: z
    .string({ message: "يوم الحجز مطلوب" })
    .nonempty({ message: "يوم الحجز مطلوب" }),
  doctor_action_id: z
    .string({ message: "الخدمة مطلوبة" })
    .nonempty({ message: "الخدمة مطلوبة" }),
  start_at: z
    .string({ message: "وقت الحجز مطلوب" })
    .nonempty({ message: "وقت الحجز مطلوب" }),
  date: z.string({ message: "تاريخ الحجز مطلوب" }).nonempty({
    message: "تاريخ الحجز مطلوب",
  }),
});

export default patientBookingSchema;
