import { IBooking } from "@/features/dashboard/bookings/types";
import { ZodSchema } from "zod";
import { useEffect } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { BOOKING_FORM_INPUTS, BOOKING_STATUS_OPTIONS } from "@/constants";
import convertDay from "@/shared/utils/convertDayLang";
import {
  useGetAllClinicDoctors,
  useGetAvailableBookingsTime,
} from "@/shared/lib/react-query/main";
import {
  useCreateBooking,
  useUpdateBooking,
} from "@/features/dashboard/bookings/queriesAndMutations";
import SubmitButton from "@/components/shared/SubmitButton";
import { useNavigate } from "react-router";
import { handleResErr } from "@/shared/utils/handleResError";
import { AxiosResErr } from "@/shared/types";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useGetAllWorkingDays } from "@/features/dashboard/doctors/working-days";
import { useGetDoctorActions } from "@/features/dashboard/doctors";
import { RenderBookingFormFields } from "./RenderBookingFromFields";

interface IProps {
  booking?: IBooking;
  action: "create" | "update";
  bookingSchema: ZodSchema;
}

export const BookingForm = ({ booking, action, bookingSchema }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clinic_id: booking?.clinic?.id.toString() || "",
      doctor_id: booking?.doctor?.id.toString() || "",
      patient_id: booking?.patient?.id.toString() || "",
      working_day_id: booking?.working_day?.id.toString() || "",
      doctor_action_id: booking?.action?.id.toString() || "",
      start_at: booking?.start_at || "",
      date: booking?.booking_date || "",
      status: booking?.status || "pending",
    },
  });

  // Watch the key cascading fields
  const clinicId = useWatch({
    control: form.control,
    name: "clinic_id",
  });

  const doctorId = useWatch({
    control: form.control,
    name: "doctor_id",
  });

  const workingDayId = useWatch({
    control: form.control,
    name: "working_day_id",
  });

  const date = useWatch({
    control: form.control,
    name: "date",
  });

  // Fetch data using watched values directly
  const {
    data: clinics,
    isError: isErrorClinics,
    failureReason: failureReasonClinic,
  } = useGetAllClinics({ token, filter: { status: "1" } });

  const {
    data: doctors,
    isError: isErrorDoctors,
    failureReason: failureReasonDoctors,
  } = useGetAllClinicDoctors({ token, clinic_id: clinicId! });

  const {
    data: workingDays,
    isError: isErrorWorkingDays,
    failureReason: failureReasonWorkingDay,
  } = useGetAllWorkingDays({ doctorId });

  const {
    data: doctorActions,
    isError: isErrorActions,
    failureReason: failureReasonDoctorActions,
  } = useGetDoctorActions({ doctorId });

  const { data: availableTimes } = useGetAvailableBookingsTime({
    token,
    doctor_id: doctorId,
    working_day_id: workingDayId,
    clinic_id: clinicId,
    booking_date: date,
  });

  // Error toasts
  useEffect(() => {
    if (isErrorClinics && failureReasonClinic) {
      const err = failureReasonClinic as AxiosResErr;
      toast.error(`العيادات | ${err?.response?.data?.message}`);
    }
    if (isErrorDoctors && failureReasonDoctors) {
      const err = failureReasonDoctors as AxiosResErr;
      toast.error(`الأطباء | ${err?.response?.data?.message}`);
    }
    if (isErrorWorkingDays && failureReasonWorkingDay) {
      const err = failureReasonWorkingDay as AxiosResErr;
      toast.error(`ايام العمل | ${err?.response?.data?.message}`);
    }
    if (isErrorActions && failureReasonDoctorActions) {
      const err = failureReasonDoctorActions as AxiosResErr;
      toast.error(`الإجراءات | ${err?.response?.data?.message}`);
    }
  }, [
    isErrorClinics,
    failureReasonClinic,
    isErrorDoctors,
    failureReasonDoctors,
    isErrorWorkingDays,
    failureReasonWorkingDay,
    isErrorActions,
    failureReasonDoctorActions,
  ]);

  // Prepare select options
  const clinicsOptions =
    clinics?.data?.map((clinic) => ({
      label: clinic.name,
      value: clinic.id.toString(),
    })) ?? [];

  const doctorsOptions =
    doctors?.data?.map((doctor) => ({
      value: doctor.id.toString(),
      label: doctor.name,
    })) ?? [];

  const workingDaysOptions =
    workingDays?.data?.map((day) => ({
      label: `${convertDay(day.day, "en")} بداية من ${day.start_at} الي ${day.end_at}`,
      value: day.id.toString(),
    })) ?? [];

  const doctorActionsOptions =
    doctorActions?.data?.map((action) => ({
      value: action.id.toString(),
      label: `${action.name} - ${numberToPrice(action.price)}`,
    })) ?? [];

  const allowedDay = workingDays?.data?.find(
    (day) => day.id.toString() === workingDayId
  );

  // Cascading reset logic
  useEffect(() => {
    if (!clinicId) return;
    form.setValue("doctor_id", "");
    form.setValue("working_day_id", "");
    form.setValue("doctor_action_id", "");
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [clinicId, form]);

  useEffect(() => {
    if (!doctorId) return;
    form.setValue("working_day_id", "");
    form.setValue("doctor_action_id", "");
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [doctorId, form]);

  useEffect(() => {
    if (!workingDayId) return;
    form.setValue("date", "");
    form.setValue("start_at", "");
  }, [workingDayId, form]);

  useEffect(() => {
    if (!date) return;
    form.setValue("start_at", "");
  }, [date, form]);

  // Initial setup for edit mode
  useEffect(() => {
    if (!booking) return;

    form.reset({
      patient_id: booking.patient.id.toString(),
      clinic_id: booking.clinic?.id.toString() || "",
      doctor_id: booking.doctor?.id.toString() || "",
      working_day_id: booking.working_day?.id.toString() || "",
      doctor_action_id: booking.action?.id.toString() || "",
      date: booking.booking_date || "",
      start_at: booking.start_at || "",
      status: booking.status || "pending",
    });
  }, [booking, form]);

  const { mutateAsync: createBooking, isPending: isLoadingCreate } =
    useCreateBooking();
  const { mutateAsync: updateBooking, isPending: isLoadingUpdate } =
    useUpdateBooking();

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    try {
      if (action === "update") {
        const { status, message } = await updateBooking({
          id: booking?.id || 0,
          formData: {
            clinic_id: data.clinic_id,
            doctor_id: data.doctor_id,
            patient_id: data.patient_id,
            working_day_id: data.working_day_id,
            doctor_action_id: data.doctor_action_id,
            date: data.date,
            start_at: data.start_at,
            status: data.status,
          },
        });

        if (!status) return toast.error(message);
        toast.success(message);
      } else {
        const { status, message } = await createBooking({
          clinic_id: data.clinic_id,
          doctor_id: data.doctor_id,
          patient_id: data.patient_id,
          working_day_id: data.working_day_id,
          doctor_action_id: data.doctor_action_id,
          date: data.date,
          start_at: data.start_at,
        });

        if (!status) return toast.error(message);
        toast.success(message);
        form.reset();
      }

      navigate("/dashboard/bookings");
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-black dark:text-white"
      >
        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 md:gap-y-5 dark:text-white"
          variants={containerVariants}
        >
          {BOOKING_FORM_INPUTS.map((input, idx) => {
            if (input.name === "status" && action === "create") return null;

            return (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderBookingFormFields
                  input={input}
                  form={form}
                  schema={bookingSchema}
                  options={{
                    clinicsOptions,
                    workingDaysOptions,
                    doctorsOptions,
                    doctorActionsOptions,
                    status: BOOKING_STATUS_OPTIONS,
                  }}
                  availableTimes={availableTimes?.data || []}
                  allowedDay={allowedDay?.day || ""}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={containerVariants}>
          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة حجز"
            updateText="تحديث بيانات الحجز"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};
