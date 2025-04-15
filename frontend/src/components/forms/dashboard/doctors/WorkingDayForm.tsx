import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import cookieServices from "@/utils/cookieServices";
import { DAYS, DOCTOR_WORKING_DAY_INPUTS } from "@/constants";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { IWorkingDay } from "@/interfaces/dashboard/doctors/workingDays";
import SubmitButton from "../../../SubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateWorkingDay,
  useUpdateWorkingDay,
} from "@/lib/react-query/dashboard/doctors/workingDays";
import { formatTime, reverseFormatTime } from "@/utils/formatTime";
import doctorWorkingDaySchema from "@/validations/dashboard/doctorWorkingDaySchema";
import { useEffect } from "react";
import { useGetDoctorById } from "@/lib/react-query/dashboard/doctors/doctors";
import handleResErr from "@/utils/handleResponseError";
import RenderDoctorFormFields from "./RenderDoctorFormFields";

interface IProps {
  day?: IWorkingDay;
  action: "create" | "update";
}

const WorkingDayForm = ({ action, day }: IProps) => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { doctorId } = useParams();

  const { data: doctor } = useGetDoctorById({ token, id: doctorId! });

  const clinicsOptions = doctor?.data.clinics?.map((clinic) => ({
    label: clinic.name,
    value: clinic.id.toString(),
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
      deuration: 0,
      max_visitors: 0,
      start_at: "",
      end_at: "",
    },
  });

  useEffect(() => {
    if (action === "update")
      form.reset({
        clinic_id: day?.clinic.id.toString() || "",
        day: day?.day ? day.day : "",
        deuration: day?.deuration || 0,
        max_visitors: day?.max_visitors || 0,
        start_at: day?.start_at
          ? reverseFormatTime(day?.start_at as string)
          : "",
        end_at: day?.end_at ? reverseFormatTime(day?.end_at as string) : "",
      });
  }, [form, day, action]);

  const onSubmit = async (data: z.infer<typeof doctorWorkingDaySchema>) => {
    try {
      if (action === "create") {
        const { status, message } = await createWorkingDay({
          token,
          formData: {
            ...data,
            start_at: formatTime(data.start_at),
            end_at: formatTime(data.end_at),
            clinic_id: data.clinic_id,
            day: data.day,
            doctor_id: doctorId!,
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
            clinic_id: data.clinic_id,
            day: data.day,
            doctor_id: doctorId!,
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
      handleResErr(error);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        key={day?.id || "createWorkingDay"}
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
              <RenderDoctorFormFields
                input={input}
                form={form}
                schema={doctorWorkingDaySchema}
                options={{
                  clinics: clinicsOptions!,
                  days: daysOptions,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={containerVariants}>
          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة يوم عمل"
            updateText="تحديث يوم العمل"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default WorkingDayForm;
