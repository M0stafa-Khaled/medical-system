import { useEffect } from "react";
import { Form } from "@/shared/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import cookieServices from "@/shared/utils/cookieServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { PATIENT_BOOKING_FORM_INPUTS } from "@/constants";
import convertDay from "@/shared/utils/convertDayLang";
import {
  useGetAllClinicDoctors,
  useGetAvailableBookingsTime,
} from "@/shared/lib/react-query/main";
import SubmitButton from "@/components/shared/SubmitButton";
import { useNavigate } from "react-router";
import { handleResErr } from "@/shared/utils/handleResError";
import patientBookingSchema from "@/validations/patient/patientBookingSchema";
import RenderPatientBookingFormFields from "./RenderPatientBookingFormFields";
import {
  useCreatePatientBooking,
  useUpdatePatientBooking,
} from "@/shared/lib/react-query/patient/patientBookings";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useGetAllWorkingDays } from "@/features/dashboard/doctors/working-days";
import { useGetDoctorActions } from "@/features/dashboard/doctors";

interface IProps {
  booking?: IPatientBooking;
  action: "create" | "update";
}

const PatientBookingForm = ({ booking, action }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const form = useForm<z.infer<typeof patientBookingSchema>>({
    resolver: zodResolver(patientBookingSchema),
    defaultValues: {
      clinic_id: booking?.clinic?.id.toString() || "",
      doctor_id: booking?.doctor?.id.toString() || "",
      working_day_id: booking?.working_day?.id.toString() || "",
      doctor_action_id: booking?.action?.id.toString() || "",
      start_at: booking?.start_at || "",
      date: booking?.booking_date || "",
    },
  });

  // Watch cascading fields
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

  // Fetch data using watched values
  const { data: clinics } = useGetAllClinics({
    filter: { status: "1" },
  });

  const { data: doctors } = useGetAllClinicDoctors({
    token,
    clinic_id: clinicId,
  });

  const { data: workingDays } = useGetAllWorkingDays({
    doctorId: doctorId,
  });

  const { data: doctorActions } = useGetDoctorActions({
    doctorId: doctorId,
  });

  const { data: availableTimes } = useGetAvailableBookingsTime({
    token,
    doctor_id: doctorId,
    working_day_id: workingDayId,
    clinic_id: clinicId,
    booking_date: date,
  });

  // Prepare options
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

  // Find allowed day (changed from filter → find)
  const allowedDay =
    workingDays?.data?.find((day) => day.id.toString() === workingDayId)?.day ??
    "";

  // Reactive resets when parent field changes
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

  // Initialize form for edit mode
  useEffect(() => {
    if (booking) {
      form.reset({
        clinic_id: booking.clinic?.id.toString() || "",
        doctor_id: booking.doctor?.id.toString() || "",
        working_day_id: booking.working_day?.id.toString() || "",
        doctor_action_id: booking.action?.id.toString() || "",
        date: booking.booking_date || "",
        start_at: booking.start_at || "",
      });
    }
  }, [booking, form]);

  const { mutateAsync: createPatientBooking, isPending: isLoadingCreate } =
    useCreatePatientBooking();

  const { mutateAsync: updatePatientBooking, isPending: isLoadingUpdate } =
    useUpdatePatientBooking();

  const onSubmit = async (data: z.infer<typeof patientBookingSchema>) => {
    try {
      if (action === "update") {
        const { message, status } = await updatePatientBooking({
          id: booking?.id.toString() || "",
          booking: {
            clinic_id: data.clinic_id,
            doctor_id: data.doctor_id,
            working_day_id: data.working_day_id,
            doctor_action_id: data.doctor_action_id,
            date: data.date,
            start_at: data.start_at,
          },
          token,
        });

        if (!status) return toast.error(message);
        toast.success(message);
      } else {
        const { status, message } = await createPatientBooking({
          booking: {
            clinic_id: data.clinic_id,
            doctor_id: data.doctor_id,
            working_day_id: data.working_day_id,
            doctor_action_id: data.doctor_action_id,
            date: data.date,
            start_at: data.start_at,
          },
          token,
        });

        if (!status) return toast.error(message);
        toast.success(message);
        form.reset();
      }

      navigate("/bookings");
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
          {PATIENT_BOOKING_FORM_INPUTS.map((input, idx) => (
            <motion.div key={input.name} custom={idx} variants={itemVariants}>
              <RenderPatientBookingFormFields
                input={input}
                form={form}
                schema={patientBookingSchema}
                options={{
                  clinicsOptions,
                  workingDaysOptions,
                  doctorsOptions,
                  doctorActionsOptions,
                }}
                availableTimes={availableTimes?.data || []}
                allowedDay={allowedDay}
              />
            </motion.div>
          ))}
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

export default PatientBookingForm;
