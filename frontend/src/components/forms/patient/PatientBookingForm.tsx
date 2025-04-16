import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import { toast } from "react-toastify";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { PATIENT_BOOKING_FORM_INPUTS } from "@/constants";
import { useGetAllWorkingDays } from "@/lib/react-query/dashboard/doctors/workingDays";
import convertDay from "@/utils/convertDayLang";
import {
  useGetAllDoctorsClinics,
  useGetAvailableBookingsTime,
} from "@/lib/react-query/main";
import SubmitButton from "@/components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";
import handleResErr from "@/utils/handleResponseError";
import patientBookingSchema from "@/validations/patient/patientBookingSchema";
import RenderPatientBookingFormFields from "./RenderPatientBookingFormFields";
import {
  useCreatePatientBooking,
  useUpdatePatientBooking,
} from "@/lib/react-query/patient/patientBookings";
import { IPatientBooking } from "@/interfaces/patient/patientBookings";

interface IProps {
  booking?: IPatientBooking;
  action: "create" | "update";
}

const PatientBookingForm = ({ booking, action }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  // State
  const [clinicId, setClinicId] = useState<string>(
    booking?.clinic?.id.toString() || ""
  );
  const [doctorId, setDoctorId] = useState<string>(
    booking?.doctor?.id.toString() || ""
  );
  const [workingDayId, setWorkingDayId] = useState<string>(
    booking?.working_day?.id.toString() || ""
  );
  const [bookingDate, setBookingDate] = useState<string>(
    booking?.booking_date || ""
  );

  // Get data from api
  const { data: clinics } = useGetAllClinics({
    token,
    filter: {
      status: "1",
    },
  });

  const { data: doctors } = useGetAllDoctorsClinics({
    token,
    clinic_id: clinicId!,
  });

  const { data: workingDays } = useGetAllWorkingDays({
    doctorId: doctorId!,
    token,
  });

  const { data: doctorActions } = useGetDoctorActions({
    doctorId: doctorId!,
    token,
  });

  const { data: availableTimes } = useGetAvailableBookingsTime({
    token,
    doctor_id: doctorId,
    working_day_id: workingDayId,
    clinic_id: clinicId,
    booking_date: bookingDate,
  });

  // Create options from data to add it in select with label and value
  const doctorActionsOptions = doctorActions?.data?.map((action) => ({
    value: action.id.toString(),
    label: `${action.name} - ${action.price} جنيه`,
  }));

  const doctorsOptions = doctors?.data?.map((doctor) => ({
    value: doctor.id.toString(),
    label: doctor.name,
  }));

  const clinicsOptions = clinics?.data?.map((clinic) => ({
    label: clinic.name,
    value: clinic.id.toString(),
  }));

  const workingDaysOptions = workingDays?.data?.map((day) => ({
    label: `${convertDay(day.day, "en")} بداية من ${day.start_at} الي ${
      day.end_at
    }`,
    value: day.id.toString(),
  }));

  const allowedDay = workingDays?.data.filter(
    (day) => day.id.toString() === workingDayId
  );

  // Create booking
  const { mutateAsync: createPatientBooking, isPending: isLoadingCreate } =
    useCreatePatientBooking();

  // Update booking
  const { mutateAsync: updatePatientBooking, isPending: isLoadingUpdate } =
    useUpdatePatientBooking();

  const form = useForm<z.infer<typeof patientBookingSchema>>({
    resolver: zodResolver(patientBookingSchema),
    defaultValues: {
      clinic_id: "",
      doctor_id: "",
      working_day_id: "",
      doctor_action_id: "",
      start_at: "",
      date: "",
    },
  });

  useEffect(() => {
    setClinicId(booking?.clinic?.id.toString() || "");
    setDoctorId(booking?.doctor?.id.toString() || "");
    setWorkingDayId(booking?.working_day?.id.toString() || "");
    setBookingDate(booking?.booking_date || "");
    form.setValue("start_at", booking?.start_at || "");
    form.reset({
      doctor_id: booking?.doctor?.id.toString() || "",
      clinic_id: booking?.clinic?.id.toString() || "",
      working_day_id: booking?.working_day?.id.toString() || "",
      doctor_action_id: booking?.action?.id.toString() || "",
      start_at: booking?.start_at || "",
      date: booking?.booking_date || "",
    });
  }, [form, booking]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "clinic_id") {
        const clinicValue = value.clinic_id as string;
        setClinicId(clinicValue);
        // Reset values when change clinic
        form.setValue("doctor_id", "");
        form.setValue("working_day_id", "");
        form.setValue("doctor_action_id", "");
        form.setValue("date", "");
        form.setValue("start_at", "");
        setDoctorId("");
        setWorkingDayId("");
      }

      if (name === "doctor_id") {
        const doctorValue = value.doctor_id as string;
        form.setValue("working_day_id", "");
        form.setValue("doctor_action_id", "");
        form.setValue("date", "");
        form.setValue("start_at", "");
        setWorkingDayId("");
        setDoctorId(doctorValue);
      }

      if (name === "working_day_id") {
        const workingDayValue = value.working_day_id as string;
        form.setValue("date", "");
        form.setValue("start_at", "");
        setWorkingDayId(workingDayValue);
      }

      if (name === "date") {
        form.setValue("start_at", "");
        const dateValue = value.date;
        setBookingDate(dateValue!);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
        // ! Update failed
        if (!status) return toast.error(message);
        // * Update Success
        toast.success(message);
      }

      // Create Booking
      if (action === "create") {
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
        // ! Create failed
        if (!status) return toast.error(message);
        // * Create Success
        toast.success(message);
        handleResetFrom();
      }
      return navigate("/bookings");
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleResetFrom = () => {
    form.reset({
      clinic_id: "",
      doctor_id: "",
      doctor_action_id: "",
      working_day_id: "",
      start_at: "",
      date: "",
    });
    setClinicId("");
    form.setValue("doctor_id", "");
    form.setValue("working_day_id", "");
    form.setValue("start_at", "");
    setWorkingDayId("");
    setBookingDate("");
    setDoctorId("");
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
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 md:gap-y-5 dark:text-white"
          variants={containerVariants}
        >
          {PATIENT_BOOKING_FORM_INPUTS.map((input, idx) => {
            return (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderPatientBookingFormFields
                  input={input}
                  form={form as unknown as UseFormReturn}
                  schema={patientBookingSchema}
                  options={{
                    clinicsOptions: clinicsOptions!,
                    workingDaysOptions: workingDaysOptions!,
                    doctorsOptions: doctorsOptions!,
                    doctorActionsOptions: doctorActionsOptions!,
                  }}
                  availableTimes={availableTimes?.data || []}
                  allowedDay={allowedDay ? allowedDay[0]?.day : ""}
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

export default PatientBookingForm;
