import { z } from "zod";

const updateBookingSchema = z.object({
  patient_id: z
    .object(
      {
        label: z
          .string({ message: "المريض مطلوب" })
          .nonempty({ message: "المريض مطلوب" }),
        value: z
          .string({ message: "المريض مطلوب" })
          .nonempty({ message: "المريض مطلوب" }),
      },
      {
        message: "المريض مطلوب",
      }
    )
    .refine((data) => data.value, {
      message: "المريض مطلوب",
    }),
  clinic_id: z
    .object(
      {
        label: z
          .string({ message: "العيادة مطلوبة" })
          .min(1, { message: "العيادة مطلوبة" }),
        value: z
          .string({ message: "العيادة مطلوبة" })
          .min(1, { message: "العيادة مطلوبة" }),
      },
      { message: "العيادة مطلوبة" }
    )
    .refine((data) => data.value, { message: "العيادة مطلوبة" }),
  doctor_id: z
    .object(
      {
        label: z
          .string({ message: "الطبيب مطلوب" })
          .nonempty({ message: "الطبيب مطلوب" }),
        value: z
          .string({ message: "الطبيب مطلوب" })
          .nonempty({ message: "الطبيب مطلوب" }),
      },
      {
        message: "الطبيب مطلوب",
      }
    )
    .refine((data) => data.value, { message: "الطبيب مطلوب" }),
  working_day_id: z
    .object(
      {
        label: z.string({ message: "يوم الحجز مطلوب" }),
        value: z.string({ message: "يوم الحجز مطلوب" }),
      },
      { message: "يوم الحجز مطلوب" }
    )
    .refine((data) => data.value, { message: "يوم الحجز مطلوب" }),

  doctor_action_id: z
    .object(
      {
        label: z
          .string({ message: "الخدمة مطلوبة" })
          .nonempty({ message: "الخدمة مطلوبة" }),
        value: z
          .string({ message: "الخدمة مطلوبة" })
          .nonempty({ message: "الخدمة مطلوبة" }),
      },
      { message: "الخدمة مطلوبة" }
    )
    .refine((data) => data.value, { message: "الخدمة مطلوبة" }),

  status: z
    .object(
      {
        label: z
          .string({ message: "حالة الحجز مطلوبة" })
          .nonempty({ message: "حالة الحجز مطلوبة" }),
        value: z
          .string({ message: "حالة الحجز مطلوبة" })
          .nonempty({ message: "حالة الحجز مطلوبة" }),
      },
      { message: "حالة الحجز مطلوبة" }
    )
    .refine((data) => data.value, { message: "حالة الحجز مطلوبة" }),

  start_at: z
    .string({ message: "وقت الحجز مطلوب" })
    .nonempty({ message: "وقت الحجز مطلوب" }),

  date: z.string({ message: "تاريخ الحجز مطلوب" }).nonempty({
    message: "تاريخ الحجز مطلوب",
  }),
});

export default updateBookingSchema;
