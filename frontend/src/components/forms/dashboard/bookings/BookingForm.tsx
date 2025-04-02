import { IBooking } from "@/interfaces/dashboard/bookings";
import { ZodSchema } from "zod";
import { useCallback, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import { toast } from "react-toastify";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { BOOKING_FORM_INPUTS, BOOKING_STATUS_OPTIONS } from "@/constants";
import { useGetAllWorkingDays } from "@/lib/react-query/dashboard/doctors/workingDays";
import convertDay from "@/utils/convertDayLang";
import {
  useGetAllDoctorsClinics,
  useGetAvailableBookingsTime,
} from "@/lib/react-query/main";
import {
  useCreateBooking,
  useUpdateBooking,
} from "@/lib/react-query/dashboard/bookings";
import RenderBookingFormFields from "./RenderBookingFromFields";
import SubmitButton from "@/components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";
import handleResErr from "@/utils/handleResponseError";

interface IProps {
  booking?: IBooking;
  action: "create" | "update";
  bookingSchema: ZodSchema;
}
const BookingForm = ({ booking, action, bookingSchema }: IProps) => {
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

  // If req to get date return with Messages
  useEffect(() => {
    if (clinics?.message) toast(clinics.message);
    if (doctors?.message) toast(doctors.message);
    if (doctorActions?.message) toast(doctorActions.message);
    if (workingDays?.message) toast(workingDays.message);
    if (availableTimes?.message) toast(availableTimes.message);
  }, [
    availableTimes?.message,
    doctorActions?.message,
    doctors?.message,
    workingDays?.message,
    clinics?.message,
  ]);

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
  const { mutateAsync: createBooking, isPending: isLoadingCreate } =
    useCreateBooking();

  // Update booking
  const { mutateAsync: updateBooking, isPending: isLoadingUpdate } =
    useUpdateBooking();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clinic_id: {
        label: "",
        value: "",
      },
      doctor_id: {
        label: "",
        value: "",
      },
      patient_id: {
        label: "",
        value: "",
      },
      working_day_id: { label: "", value: "" },
      doctor_action_id: { label: "", value: "" },
      start_at: "",
      date: "",
      status: {
        label: "",
        value: "",
      },
    },
  });

  const initialBookingStatus = useCallback(() => {
    if (booking?.status === "cancelled")
      return {
        label: "ملغي",
        value: "cancelled",
      };
    if (booking?.status === "collected")
      return {
        label: "تم التحصيل",
        value: "collected",
      };
    if (booking?.status === "no-show")
      return {
        label: "لم يحضر",
        value: "no-show",
      };

    if (booking?.status === "pending")
      return {
        label: "قيد الانتظار",
        value: "pending",
      };
    if (booking?.status === "ended")
      return {
        label: "منتهي",
        value: "ended",
      };
  }, [booking?.status]);

  useEffect(() => {
    setClinicId(booking?.clinic?.id.toString() || "");
    setDoctorId(booking?.doctor?.id.toString() || "");
    setWorkingDayId(booking?.working_day?.id.toString() || "");
    setBookingDate(booking?.booking_date || "");
    form.setValue("start_at", booking?.start_at);
    form.reset({
      patient_id: {
        label: booking?.patient?.name || "",
        value: booking?.patient.id.toString() || "",
      },
      doctor_id: {
        label: booking?.doctor?.name || "",
        value: booking?.doctor?.id.toString() || "",
      },
      clinic_id: {
        label: booking?.clinic?.name || "",
        value: booking?.clinic?.id.toString() || "",
      },
      working_day_id: {
        label: convertDay(booking?.working_day.day as string, "en") || "",
        value: booking?.working_day.id.toString() || "",
      },
      doctor_action_id: {
        value: booking?.action.id.toString() || "",
        label: booking?.action
          ? `${booking?.action.name} - ${booking?.action.price} جنيه`
          : "",
      },
      start_at: booking?.start_at || "",
      date: booking?.booking_date || "",
      status: initialBookingStatus() || "",
    });
  }, [form, booking, initialBookingStatus]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "clinic_id") {
        const clinicValue = value.clinic_id?.value as string;
        setClinicId(clinicValue);
        // Reset values when change clinic
        form.setValue("doctor_id", { label: "", value: "" });
        form.setValue("working_day_id", { label: "", value: "" });
        form.setValue("doctor_action_id", { label: "", value: "" });
        form.setValue("date", "");
        form.setValue("start_at", "");
        setDoctorId("");
        setWorkingDayId("");
      }

      if (name === "doctor_id") {
        const doctorValue = value.doctor_id?.value as string;
        form.setValue("working_day_id", { label: "", value: "" });
        form.setValue("doctor_action_id", { label: "", value: "" });
        form.setValue("date", "");
        form.setValue("start_at", "");
        setWorkingDayId("");
        setDoctorId(doctorValue);
      }

      if (name === "working_day_id") {
        const workingDayValue = value.working_day_id?.value as string;
        form.setValue("date", "");
        form.setValue("start_at", "");
        setWorkingDayId(workingDayValue);
      }

      if (name === "date") {
        form.setValue("start_at", "");
        const dateValue = value.date;
        setBookingDate(dateValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    try {
      if (action === "update") {
        const { message, status } = await updateBooking({
          id: booking?.id,
          formData: {
            clinic_id: data.clinic_id.value,
            doctor_id: data.doctor_id.value,
            patient_id: data.patient_id.value,
            working_day_id: data.working_day_id.value,
            doctor_action_id: data.doctor_action_id.value,
            date: data.date,
            start_at: data.start_at,
            status: data.status.value,
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
        const { status, message } = await createBooking({
          formData: {
            clinic_id: data.clinic_id.value,
            doctor_id: data.doctor_id.value,
            patient_id: data.patient_id.value,
            working_day_id: data.working_day_id.value,
            doctor_action_id: data.doctor_action_id.value,
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
      return navigate("/dashboard/bookings");
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleResetFrom = () => {
    form.reset({
      clinic_id: {
        label: "",
        value: "",
      },
      doctor_id: {
        label: "",
        value: "",
      },
      patient_id: {
        label: "",
        value: "",
      },
      doctor_action_id: { label: "", value: "" },
      working_day_id: { label: "", value: "" },
      start_at: "",
      date: "",
      status: {
        label: "",
        value: "",
      },
    });
    setClinicId("");
    form.setValue("doctor_id", { label: "", value: "" });
    form.setValue("working_day_id", { label: "", value: "" });
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
          {BOOKING_FORM_INPUTS.map((input, idx) => {
            if (input.name === "status" && action === "create") return;
            return (
              <motion.div key={input.name} custom={idx} variants={itemVariants}>
                <RenderBookingFormFields
                  input={input}
                  form={form}
                  schema={bookingSchema}
                  options={{
                    clinicsOptions: clinicsOptions!,
                    workingDaysOptions: workingDaysOptions!,
                    doctorsOptions: doctorsOptions!,
                    doctorActionsOptions: doctorActionsOptions!,
                    status: BOOKING_STATUS_OPTIONS,
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

export default BookingForm;
