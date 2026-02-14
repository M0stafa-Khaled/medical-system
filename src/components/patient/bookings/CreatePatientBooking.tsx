import { useEffect, useState } from "react";
import { Form } from "@/shared/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/shared/components/ui/alert-dialog";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { motion } from "framer-motion";
import { handleResErr } from "@/shared/utils/handleResError";
import { containerVariants, itemVariants } from "@/animations";
import { PATIENT_BOOKING_FORM_INPUTS } from "@/constants";
import { useGetAllWorkingDays } from "@/shared/lib/react-query/dashboard/doctors/workingDays";
import convertDay from "@/shared/utils/convertDayLang";
import {
  useGetAllClinicDoctors,
  useGetAvailableBookingsTime,
} from "@/shared/lib/react-query/main";
import { useGetDoctorActions } from "@/shared/lib/react-query/dashboard/doctors/doctorActions";
import patientBookingSchema from "@/validations/patient/patientBookingSchema";
import { useCreatePatientBooking } from "@/shared/lib/react-query/patient/patientBookings";
import cookieServices from "@/shared/utils/cookieServices";
import RenderPatientBookingFormFields from "@/components/forms/patient/RenderPatientBookingFormFields";
import { numberToPrice } from "@/shared/utils/numberToPrice";
import { useGetAllClinics } from "@/features/dashboard/clinics";

const CreatePatientBooking = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = cookieServices.getToken()!;

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

  // Watch the fields that drive cascading logic
  const clinicId = useWatch({ control: form.control, name: "clinic_id" });
  const doctorId = useWatch({ control: form.control, name: "doctor_id" });
  const workingDayId = useWatch({
    control: form.control,
    name: "working_day_id",
  });
  const date = useWatch({ control: form.control, name: "date" });

  // Fetch dependent data using watched values
  const { data: clinics } = useGetAllClinics({
    filter: { status: "1" },
  });

  const { data: doctors } = useGetAllClinicDoctors({
    token,
    clinic_id: clinicId,
  });

  const { data: workingDays } = useGetAllWorkingDays({
    doctorId: doctorId,
    token,
  });

  const { data: doctorActions } = useGetDoctorActions({
    doctorId: doctorId,
    token,
  });

  const { data: availableTimes } = useGetAvailableBookingsTime({
    token,
    doctor_id: doctorId,
    working_day_id: workingDayId,
    clinic_id: clinicId,
    booking_date: date,
  });

  // Prepare options (safe fallback to empty array)
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

  const allowedDay =
    workingDays?.data?.find((day) => day.id.toString() === workingDayId)?.day ??
    "";

  // Cascading reset logic — reactive to watched values
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

  const { mutateAsync: createPatientBooking, isPending } =
    useCreatePatientBooking();

  const onSubmit = async (data: z.infer<typeof patientBookingSchema>) => {
    try {
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
      setIsOpen(false);
    } catch (error) {
      handleResErr(error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex h-auto items-center gap-2 py-3"
      >
        إضافة حجز جديد
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة حجز جديد"
        description={{ text: "يمكنك اضافة حجز جديد من هنا" }}
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
              className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 md:gap-y-5 dark:text-white"
              variants={containerVariants}
            >
              {PATIENT_BOOKING_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                >
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

            <AlertDialogFooter className="justify-start gap-2 text-start">
              <AlertDialogCancel
                onClick={handleCloseModal}
                className="h-auto py-2.5 text-black dark:text-white"
              >
                إلغاء
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto py-2.5"
              >
                إضافة حجز
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePatientBooking;
