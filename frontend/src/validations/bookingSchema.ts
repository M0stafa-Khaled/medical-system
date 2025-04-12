import { z } from "zod";

export const createBookingSchema = z.object({
  patient_id: z
    .string({ message: "المريض مطلوب" })
    .nonempty({ message: "المريض مطلوب" }),
  clinic_id: z
    .string({ message: "العيادة مطلوبة" })
    .min(1, { message: "العيادة مطلوبة" }),
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

export const updateBookingSchema = z.object({
  patient_id: z
    .string({ message: "المريض مطلوب" })
    .nonempty({ message: "المريض مطلوب" }),
  clinic_id: z
    .string({ message: "العيادة مطلوبة" })
    .min(1, { message: "العيادة مطلوبة" }),
  doctor_id: z
    .string({ message: "الطبيب مطلوب" })
    .nonempty({ message: "الطبيب مطلوب" }),
  working_day_id: z
    .string({ message: "يوم الحجز مطلوب" })
    .nonempty({ message: "يوم الحجز مطلوب" }),
  doctor_action_id: z
    .string({ message: "الخدمة مطلوبة" })
    .nonempty({ message: "الخدمة مطلوبة" }),
  status: z
    .string({ message: "حالة الحجز مطلوبة" })
    .nonempty({ message: "حالة الحجز مطلوبة" }),

  start_at: z
    .string({ message: "وقت الحجز مطلوب" })
    .nonempty({ message: "وقت الحجز مطلوب" }),

  date: z.string({ message: "تاريخ الحجز مطلوب" }).nonempty({
    message: "تاريخ الحجز مطلوب",
  }),
});
