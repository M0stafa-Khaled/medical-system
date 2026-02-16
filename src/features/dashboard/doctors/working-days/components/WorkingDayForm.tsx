import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { DAYS, DOCTOR_WORKING_DAY_INPUTS } from "@/constants";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { useNavigate, useParams } from "react-router";
import { formatTime, reverseFormatTime } from "@/shared/utils/formatTime";
import { useEffect } from "react";
import { handleResErr } from "@/shared/utils/handleResError";
import { RenderDoctorFormFields } from "../../components/RenderDoctorFormFields";
import { IWorkingDay } from "../types";
import { useGetDoctorById } from "../../queriesAndMutations";
import {
  useCreateWorkingDay,
  useUpdateWorkingDay,
} from "../queriesAndMutations";
import SubmitButton from "@/components/shared/SubmitButton";
import { doctorWorkingDaySchema } from "../schema";

interface IProps {
  day?: IWorkingDay;
  action: "create" | "update";
}

export const WorkingDayForm = ({ action, day }: IProps) => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const { data: doctor } = useGetDoctorById({ id: doctorId! });

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
          ...data,
          start_at: formatTime(data.start_at),
          end_at: formatTime(data.end_at),
          clinic_id: data.clinic_id,
          day: data.day,
          doctor_id: doctorId!,
        });
        if (!status) return toast.error(message);
        toast.success(message);
      }

      if (action === "update") {
        const { status, message } = await updateWorkingDay({
          ...data,
          start_at: formatTime(data.start_at),
          end_at: formatTime(data.end_at),
          clinic_id: data.clinic_id,
          day: data.day,
          doctor_id: doctorId!,
          id: day?.id,
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
          className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 dark:text-white"
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
