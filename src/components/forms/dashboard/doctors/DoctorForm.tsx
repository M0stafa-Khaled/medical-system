import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/shared/components/ui/form";
import { DOCTOR_FORM_INPUTS } from "@/constants";
import { IDoctor } from "@/interfaces/dashboard/doctors/doctor";
import { useUploadImgHandler } from "@/shared/hooks/useUploadImgHandler";
import cookieServices from "@/shared/utils/cookieServices";
import { toast } from "react-toastify";
import {
  useCreateDoctor,
  useUpdateDoctor,
} from "@/shared/lib/react-query/dashboard/doctors/doctors";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import RenderDoctorFormFields from "./RenderDoctorFormFields";
import { handleResErr } from "@/shared/utils/handleResError";
import { useGetAllClinics } from "@/features/dashboard/clinics";
import SubmitButton from "@/components/shared/SubmitButton";

interface IProps {
  doctor?: IDoctor;
  action: "create" | "update";
  doctorSchema: ZodSchema;
}

const DoctorForm = ({ doctor, action, doctorSchema }: IProps) => {
  const token = cookieServices.getToken() || "";
  const navigate = useNavigate();

  const { mutateAsync: CreateDoctor, isPending: isLoadingCreate } =
    useCreateDoctor();
  const { data: clinicsData } = useGetAllClinics({});
  const { mutateAsync: updateDoctor, isPending: isLoadingUpdate } =
    useUpdateDoctor();

  const clinicsOptions = clinicsData?.data.map((clinic) => ({
    value: clinic.id.toString(),
    label: clinic.name,
  }));

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema as any),
    defaultValues: {
      name: doctor?.name || "",
      personal_id: doctor?.personal_id || "",
      first_phone: doctor?.first_phone || "",
      second_phone: doctor?.second_phone || "",
      email: doctor?.user?.email || "",
      password: "",
      register_id: doctor?.register_id || "",
      gender: doctor?.gender?.toLowerCase() || "male",
      commission:
        doctor?.commission?.slice(0, doctor?.commission?.length - 1) || "",
      status: Boolean(doctor?.status) || true,
      clinics: doctor?.clinics?.map((clinic) => clinic?.id.toString()) || [],
      image: undefined,
      signature: undefined,
    },
  });

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) => {
    const optionalFields = ["second_phone", "image", "signature"];
    const updateOptionalFields = ["password", "email"];

    return (
      optionalFields.includes(fieldName) ||
      (action === "update" && updateOptionalFields.includes(fieldName))
    );
  };

  const onSubmit = async (formData: z.infer<typeof doctorSchema>) => {
    try {
      if (action === "create") {
        const { status, message } = await CreateDoctor({
          data: formData,
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم إضافة طبيب جديد بنجاح");
      }

      if (action === "update") {
        const { status, message } = await updateDoctor({
          data: { ...formData, id: doctor?.id },
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم تحديث بيانات الطبيب بنجاح");
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
        key={doctor?.id || "create"}
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
          {DOCTOR_FORM_INPUTS.map((input, index) => (
            <motion.div key={input.name} variants={itemVariants} custom={index}>
              <RenderDoctorFormFields
                input={input}
                form={form}
                handleFileChange={handleFileChange}
                isOptionalField={isOptionalField}
                schema={doctorSchema}
                options={{
                  clinics: clinicsOptions!,
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
            createText="إضافة طبيب"
            updateText="تحديث بيانات الطبيب"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default DoctorForm;
