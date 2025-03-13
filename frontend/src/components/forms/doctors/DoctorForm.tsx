import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/components/ui/form";
import { DOCTOR_FORM_INPUTS } from "@/constants";
import { IDoctor } from "@/interfaces/dashboard/doctors/doctor";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  useAddDoctor,
  useUpdateDoctor,
} from "@/lib/react-query/dashboard/doctors/doctors";
import { useNavigate } from "react-router-dom";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import { useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { motion } from "framer-motion";
import {
  itemVariants,
  containerVariants,
} from "@/animations/dashboardAnimations";
import RenderFormFields from "../RenderFormFields";

interface IProps {
  doctor?: IDoctor;
  action: "add" | "update";
  doctorSchema: ZodSchema;
}

const DoctorForm = ({ doctor, action, doctorSchema }: IProps) => {
  const token = cookieServices.getToken() || "";
  const navigate = useNavigate();

  const { mutateAsync: addDoctor, isPending: isLoadingAdd } = useAddDoctor();
  const { data: clinicsData } = useGetAllClinics({ token });
  const { mutateAsync: updateDoctor, isPending: isLoadingUpdate } =
    useUpdateDoctor();

  const clinicsOptions = clinicsData?.data.map((clinic) => ({
    value: clinic.id.toString(),
    label: clinic.name,
  }));

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      personal_id: "",
      first_phone: "",
      second_phone: "",
      email: "",
      register_id: "",
      gender: {
        value: "male",
        label: "ذكر",
      },
      password: "",
      commission: "0",
      status: true,
      image: undefined,
      signature: undefined,
      clinics: [],
    },
  });
  
  useEffect(() => {
    if (!doctor) return;
    form.reset({
      name: doctor?.name,
      personal_id: doctor?.personal_id,
      first_phone: doctor?.first_phone,
      second_phone: doctor?.second_phone || "",
      email: doctor?.user?.email,
      register_id: doctor?.register_id,
      gender: {
        value: doctor?.gender?.toLowerCase(),
        label: doctor?.gender?.toLowerCase() === "female" ? "أنثى" : "ذكر",
      },
      commission: doctor?.commission?.slice(0, doctor?.commission?.length - 1),
      status: Boolean(doctor?.status),
      clinics: doctor?.clinics?.map((clinic) => ({
        value: clinic?.id.toString(),
        label: clinic?.name,
      })),
    });
  }, [form, doctor]);

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
      if (action === "add") {
        const { status, message } = await addDoctor({
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
    }
  };

  return (
    <Form {...form}>
      <motion.form
        key={doctor?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 dark:text-white"
          variants={containerVariants}
        >
          {DOCTOR_FORM_INPUTS.map((input, index) => (
            <motion.div key={input.name} variants={itemVariants} custom={index}>
              <RenderFormFields
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
            isLoadingAdd={isLoadingAdd}
            isLoadingUpdate={isLoadingUpdate}
            addText="إضافة طبيب"
            updateText="تحديث بيانات الطبيب"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default DoctorForm;
