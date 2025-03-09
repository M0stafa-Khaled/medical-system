import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import cookieServices from "@/utils/cookieServices";
import { DAYS, DOCTOR_WORKING_DAY_INPUTS } from "@/constants";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import RenderFormFields from "@/components/forms/RenderFormFields";
import { IWorkingDay } from "@/interfaces/doctors/workingDays";
import SubmitButton from "../SubmitButton";
import { useNavigate } from "react-router-dom";
import {
  useCreateWorkingDay,
  useUpdateWorkingDay,
} from "@/lib/react-query/doctors/workingDays";
import { formatTime, reverseFormatTime } from "@/utils/formatTime";
import doctorWorkingDaySchema from "@/validations/doctorWorkingDaySchema";
import convertDay from "@/utils/convetDayLang";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface IProps {
  day?: IWorkingDay;
  action: "add" | "update";
  doctorId: string;
}

const WorkingDayForm = ({ action, day, doctorId }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { clinics } = useSelector((state: RootState) => state.doctorClinics);
  const clinicsOptions = clinics?.map((clinic) => ({
    value: clinic.name,
    label: clinic.name,
  }));

  const daysOptions = Object.entries(DAYS).map(([, value]) => ({
    value: value.en,
    label: value.ar,
  }));

  const { mutateAsync: createWorkingDay, isPending: isLoadingCreate } =
    useCreateWorkingDay();

  const { mutateAsync: updateWorkingDay, isPending: isLoadingUpdate } =
    useUpdateWorkingDay();

  const form = useForm<z.infer<typeof doctorWorkingDaySchema>>({
    resolver: zodResolver(doctorWorkingDaySchema),
    defaultValues: {
      clinic_name: {
        label: "",
        value: "",
      },
      day: {
        label: "",
        value: "",
      },
      deuration: 0,
      max_visitors: 0,
      start_at: "",
      end_at: "",
    },
  });

  useEffect(() => {
    form.reset({
      clinic_name: {
        label: day?.clinic_name || "",
        value: day?.clinic_name || "",
      },
      day: {
        label: convertDay(day?.day as string, "en") || "",
        value: day?.day || "",
      },
      deuration: day?.deuration || 0,
      max_visitors: day?.max_visitors || 0,
      start_at: reverseFormatTime(day?.start_at as string),
      end_at: reverseFormatTime(day?.end_at as string),
    });
  }, [form, day]);

  const onSubmit = async (data: z.infer<typeof doctorWorkingDaySchema>) => {
    try {
      if (action === "add") {
        const { status, message } = await createWorkingDay({
          token,
          formData: {
            ...data,
            start_at: formatTime(data.start_at),
            end_at: formatTime(data.end_at),
            clinic_name: data.clinic_name.label,
            day: data.day.value,
            doctor_id: doctorId,
          },
        });
        if (!status) return toast.error(message);
        toast.success(message);
      }

      if (action === "update") {
        const { status, message } = await updateWorkingDay({
          formData: {
            ...data,
            start_at: formatTime(data.start_at),
            end_at: formatTime(data.end_at),
            clinic_name: data.clinic_name.label,
            day: data.day.value,
            doctor_id: doctorId,
            id: day?.id,
          },
          token,
        });
        if (!status) return toast.error(message);
        toast.success(message);
      }
      navigate(-1);
      form.reset();
    } catch (error) {
      const errorObj = error as AxiosError<{
        errors: { [key: string]: string[] };
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
    }
  };

  return (
    <Form {...form}>
      <motion.form
        key={day?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 dark:text-white"
          variants={containerVariants}
        >
          {DOCTOR_WORKING_DAY_INPUTS.map((input, idx) => (
            <motion.div variants={itemVariants} key={input.name} custom={idx}>
              <RenderFormFields
                input={input}
                form={form}
                schema={doctorWorkingDaySchema}
                options={{
                  clinic_name: clinicsOptions!,
                  days: daysOptions,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={containerVariants}>
          <SubmitButton
            action={action}
            isLoadingAdd={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            addText="إضافة يوم عمل"
            updateText="تحديث يوم العمل"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default WorkingDayForm;
