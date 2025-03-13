import { z } from "zod";

const bookingSchema = z.object({
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
    .refine((data) => data.value, { message: "المريض مطلوب" }),
  clinic_name: z
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
        label: z
          .string({ message: "يوم الحجز مطلوب" })
          .nonempty({ message: "يوم الحجز مطلوب" }),
        value: z
          .string({ message: "يوم الحجز مطلوب" })
          .nonempty({ message: "يوم الحجز مطلوب" }),
      },
      { message: "يوم الحجز مطلوب" }
    )
    .refine((data) => data.value, { message: "يوم الحجز مطلوب" }),
});

export default bookingSchema;
