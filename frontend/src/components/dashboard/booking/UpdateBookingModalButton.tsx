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
import { useUpdateBooking } from "@/lib/react-query/dashboard/bookings";
import PatientSelectItem from "./PatientSelectItem";
import { FaPencil } from "react-icons/fa6";
import { TBookingStatus } from "@/types";
import { IDoctor } from "@/interfaces/dashboard/doctors/doctor";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import { IPatient } from "@/interfaces/dashboard/patient";

interface IProps {
  status: TBookingStatus;
  clinic_name: string;
  doctor: IDoctor;
  working_day: IWorkingDay;
  patient: IPatient;
  id: string;
}

const UpdateBookingModalButton = ({
  clinic_name,
  doctor,
  id,
  patient,
  status,
  working_day,
}: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: clinics } = useGetAllClinics({ token });
  const selectedClinic = clinics?.data.find(
    (clinic) => clinic.name === clinic_name
  );
  const [clinicId, setClinicId] = useState(selectedClinic?.id.toString());
  const [doctorId, setDoctorId] = useState(doctor?.id.toString());
  const [isOpen, setIsOpen] = useState(false);
  const { data: doctors } = useGetAllDoctorsClinics({
    token,
    clinic_id: clinicId!,
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

  const { mutateAsync: updateBooking, isPending } = useUpdateBooking();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patient_id: {
        label: patient?.name,
        value: patient.id.toString(),
      },
      doctor_id: {
        label: doctor?.name,
        value: doctor?.id.toString(),
      },
      clinic_name: {
        label: selectedClinic?.name,
        value: selectedClinic?.id.toString(),
      },
      working_day_id: {
        label: convertDay(working_day.day, "en"),
        value: working_day.id.toString(),
      },
    },
  });
  useEffect(() => {
    setClinicId(selectedClinic?.id.toString())
    form.reset({
      patient_id: {
        label: patient?.name,
        value: patient.id.toString(),
      },
      doctor_id: {
        label: doctor?.name,
        value: doctor?.id.toString(),
      },
      clinic_name: {
        label: selectedClinic?.name,
        value: selectedClinic?.id.toString(),
      },
      working_day_id: {
        label: convertDay(working_day.day, "en"),
        value: working_day.id.toString(),
      },
    });
  }, [form, patient, doctor, working_day, selectedClinic]);

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
      const { status: updateStatus, message } = await updateBooking({
        formData: {
          clinic_name: clinic_name.label,
          doctor_id: doctor_id.value,
          patient_id: patient_id.value,
          working_day_id: working_day_id.value,
          status: status,
        },
        id,
        token,
      });
      // ! Create failed
      if (!updateStatus) return toast.error(message);
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
    form.reset();
    // setClinicId("");
    // form.setValue("doctor_id", { label: "", value: "" });
    // form.setValue("working_day_id", { label: "", value: "" });
    // setDoctorId("");
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="bg-primary  bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm py-1 px-1 w-9 h-9"
      >
        <FaPencil size={24} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        title="تعديل حجز"
        description={{
          text: "يمكنك  تعديل الحجز من هنا",
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
            <div className="space-y-2">
              {BOOKING_FORM_INPUTS.map((input, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={input.name}
                  custom={idx}
                >
                  <RenderFormFields
                    form={form}
                    input={input}
                    schema={bookingSchema}
                    options={{
                      clinicsOptions: clinicsOptions || [],
                      workingDaysOptions: workingDaysOptions || [],
                      doctorsOptions: doctorsOptions || [],
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
                تعديل
                {isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </AlertDialogFooter>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateBookingModalButton;
