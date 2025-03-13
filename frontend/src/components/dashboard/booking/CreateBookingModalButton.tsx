import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/Modal";
import cookieServices from "@/utils/cookieServices";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import { BOOKING_FORM_INPUTS } from "@/constants";
import bookingSchema from "@/validations/bookingSchema";
import RenderFormFields from "@/components/forms/RenderFormFields";
import { useGetAllWorkingDays } from "@/lib/react-query/dashboard/doctors/workingDays";
import convertDay from "@/utils/convertDayLang";
import { useGetAllDoctorsClinics } from "@/lib/react-query/bookings/bookings";
import { useCreateBooking } from "@/lib/react-query/dashboard/bookings";
import PatientSelectItem from "./PatientSelectItem";

const CreateBookingModalButton = () => {
  const token = cookieServices.getToken()!;
  const [clinicId, setClinicId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: clinics } = useGetAllClinics({ token });
  const { data: doctors } = useGetAllDoctorsClinics({
    token,
    clinic_id: clinicId,
  });
  const { data: workingDays } = useGetAllWorkingDays({
    doctorId: doctorId,
    token,
  });

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

  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clinic_name: {
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
    },
  });

  // Watch doctor_id field to update doctorId state
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "clinic_name") {
        const clinicValue = value.clinic_name?.value as string;
        setClinicId(clinicValue);
        // Reset doctor and working day when clinic changes
        form.setValue("doctor_id", { label: "", value: "" });
        form.setValue("working_day_id", { label: "", value: "" });
        setDoctorId("");
      }
      if (name === "doctor_id") {
        const doctorValue = value.doctor_id?.value as string;
        setDoctorId(doctorValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async ({
    clinic_name,
    doctor_id,
    patient_id,
    working_day_id,
  }: z.infer<typeof bookingSchema>) => {
    try {
      const { status, message } = await createBooking({
        formData: {
          clinic_name: clinic_name.label,
          doctor_id: doctor_id.value,
          patient_id: patient_id.value,
          working_day_id: working_day_id.value,
        },
        token,
      });
      // ! Create failed
      if (!status) return toast.error(message);
      // * Create Success
      return toast.success(message);
    } catch (error) {
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
        message: string;
      }>;
      if (errorObj?.response?.data.errors) {
        Object.keys(errorObj.response.data.errors).forEach((key) => {
          errorObj?.response?.data.errors[key].forEach((error) =>
            toast.error(error, {
              autoClose: 5000,
            })
          );
        });
      }
      if (
        errorObj?.response?.data.message &&
        !errorObj?.response?.data.errors
      ) {
        toast.error(errorObj?.response?.data.message, {
          autoClose: 5000,
        });
      }
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    form.reset({
      clinic_name: undefined,
      doctor_id: undefined,
      patient_id: undefined,
      working_day_id: undefined,
    });
    setClinicId("");
    form.setValue("doctor_id", { label: "", value: "" });
    form.setValue("working_day_id", { label: "", value: "" });
    setDoctorId("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 h-auto py-3 font-medium"
      >
        إضافة حجز جديد
        <FiPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="إضافة حجز جديد"
        description={{
          text: "يمكنك حجز جديد من هنا",
        }}
        showFooter={false}
      >
        <Form {...form}>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black dark:text-white"
          >
            <div className="space-y-1">
              {BOOKING_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  key={input.name}
                  custom={idx}
                  variants={itemVariants}
                >
                  <RenderFormFields
                    input={input}
                    form={form}
                    schema={bookingSchema}
                    options={{
                      clinicsOptions: clinicsOptions!,
                      workingDaysOptions: workingDaysOptions!,
                      doctorsOptions: doctorsOptions!,
                    }}
                  />
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <PatientSelectItem form={form} />
              </motion.div>
            </div>
            <AlertDialogFooter className="text-start !justify-start gap-2">
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
                إضافة
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBookingModalButton;
