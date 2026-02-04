import { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { motion } from "framer-motion";
import handleResErr from "@/utils/handleResponseError";
import { useEffect } from "react";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import { containerVariants, itemVariants } from "@/animations";
import { PATIENT_BOOKING_FORM_INPUTS } from "@/constants";
import { useGetAllWorkingDays } from "@/lib/react-query/dashboard/doctors/workingDays";
import convertDay from "@/utils/convertDayLang";
import {
  useGetAllClinicDoctors,
  useGetAvailableBookingsTime,
} from "@/lib/react-query/main";
import { useGetDoctorActions } from "@/lib/react-query/dashboard/doctors/doctorActions";
import patientBookingSchema from "@/validations/patient/patientBookingSchema";
import { useCreatePatientBooking } from "@/lib/react-query/patient/patientBookings";
import cookieServices from "@/utils/cookieServices";
import RenderPatientBookingFormFields from "@/components/forms/patient/RenderPatientBookingFormFields";
import { numberToPrice } from "@/utils/numberToPrice";

const CreatePatientBooking = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = cookieServices.getToken()!;

  // State
  const [clinicId, setClinicId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [workingDayId, setWorkingDayId] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");

  // Get data from api
  const { data: clinics } = useGetAllClinics({
    token,
    filter: {
      status: "1",
    },
  });

  const { data: doctors } = useGetAllClinicDoctors({
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
    label: `${action.name} - ${numberToPrice(action.price)}`,
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

  const allowedDay = workingDays?.data.find(
    (day) => day.id.toString() === workingDayId
  );

  // Create booking
  const { mutateAsync: createPatientBooking, isPending } =
    useCreatePatientBooking();

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
      // Create Booking

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

  const handleCloseModal = () => {
    setIsOpen(false);
    handleResetFrom();
  };
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 h-auto py-3"
      >
        إضافة حجز جديد
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة حجز جديد"
        description={{
          text: "يمكنك اضافة حجز جديد من هنا",
        }}
        showFooter={false}
      >
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
                  <motion.div
                    key={input.name}
                    custom={idx}
                    variants={itemVariants}
                  >
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
                      allowedDay={allowedDay ? allowedDay.day : ""}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            <AlertDialogFooter className="text-start justify-start! gap-2">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="text-black dark:text-white py-2.5 h-auto"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="py-2.5 h-auto"
              >
                إضافة حجز
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePatientBooking;
