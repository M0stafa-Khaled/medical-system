import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/shared/components/ui/form";
import { PATIENT_FORM_INPUTS } from "@/constants";
import { IPatient } from "@/features/dashboard/patients/types";
import { useUploadImgHandler } from "@/shared/hooks/useUploadImgHandler";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  useCreatePatient,
  useUpdatePatient,
} from "@/features/dashboard/patients/queriesAndMutations";
import { useEffect } from "react";
import SubmitButton from "../../../../components/shared/SubmitButton";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { RenderPatientFormFields } from "./RenderPatientFormFields";
import { handleResErr } from "@/shared/utils/handleResError";

interface IProps {
  patient?: IPatient;
  action: "create" | "update";
  patientSchema: ZodSchema;
}

export const PatientForm = ({ patient, action, patientSchema }: IProps) => {
  const token = cookieServices.getToken() || "";
  const navigate = useNavigate();

  const { mutateAsync: createPatient, isPending: isLoadingCreate } =
    useCreatePatient();
  const { mutateAsync: updatePatient, isPending: isLoadingUpdate } =
    useUpdatePatient();

  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      password: "",
      name: patient?.name || "",
      another_name: patient?.another_name || "",
      personal_id: patient?.personal_id || "",
      first_phone: patient?.first_phone || "",
      second_phone: patient?.second_phone || "",
      email: patient?.user?.email || "",
      description: patient?.description || "",
      info_status: patient?.info_status || "",
      gender: patient?.gender?.toLowerCase() || "male",
      status: Boolean(patient?.status) || true,
      personal_image: undefined,
    },
  });

  useEffect(() => {
    if (!patient) return;
    form.reset({
      name: patient?.name || "",
      another_name: patient?.another_name || "",
      personal_id: patient?.personal_id || "",
      first_phone: patient?.first_phone || "",
      second_phone: patient?.second_phone || "",
      email: patient?.user?.email || "",
      description: patient?.description || "",
      info_status: patient?.info_status || "",
      gender: patient?.gender?.toLowerCase() || "male",
      status: Boolean(patient?.status) || true,
    });
  }, [form, patient]);

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) => {
    const optionalFields = [
      "another_name",
      "second_phone",
      "personal_image",
      "description",
      "info_status",
    ];
    const updateOptionalFields = ["password", "email"];

    return (
      optionalFields.includes(fieldName) ||
      (action === "update" && updateOptionalFields.includes(fieldName))
    );
  };

  const onSubmit = async (formData: z.infer<typeof patientSchema>) => {
    try {
      if (action === "create") {
        const { status, message } = await createPatient({
          data: formData,
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم إضافة مريض جديد بنجاح");
      }

      if (action === "update") {
        const { status, message } = await updatePatient({
          data: { ...formData, id: patient?.id },
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم تحديث بيانات المريض بنجاح");
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
        key={patient?.id || "create"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 dark:text-white"
          variants={containerVariants}
        >
          {PATIENT_FORM_INPUTS.map((input, index) => (
            <motion.div key={input.name} variants={itemVariants} custom={index}>
              <RenderPatientFormFields
                form={form}
                handleFileChange={handleFileChange}
                input={input}
                isOptionalField={isOptionalField}
                schema={patientSchema}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={containerVariants}>
          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة مريض"
            updateText="تحديث بيانات المريض"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};
