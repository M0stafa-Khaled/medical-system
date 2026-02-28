import {
  useForm,
  useFieldArray,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  DOCTOR_PRESCRIPTIONS_INPUTS,
  PRESCRIPTIONS_TYPES,
} from "@/shared/constants";
import { IPrescription } from "@/features/dashboard/prescriptions/types";
import { handleResErr } from "@/shared/utils/handleResError";
import { prescriptionSchema } from "@/features/dashboard/prescriptions/schema";
import { TPrescriptableType } from "@/shared/types";
import { useNavigate, useParams } from "react-router";
import { Delete } from "lucide-react";
import SubmitButton from "@/shared/components/SubmitButton";
import {
  useCreateDoctorPrescription,
  useGetDoctorClinics,
  useUpdateDoctorPrescription,
} from "../../queriesAndMutations";
import { useGetAllDosages } from "@/features/dosages";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/shared/animations";
import { RenderPrescriptionFormFields } from "@/features/dashboard/prescriptions/components/RenderPrescriptionFormFields";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem";
import ScansSelectFormItem from "@/shared/components/formItems/ScansSelectFormItem";
import DrugsSelectFormItem from "@/shared/components/formItems/DrugsSelectFormItem";
import AnalysisSelectFormItem from "@/shared/components/formItems/AnalysisSelectFormItem";

interface IProps {
  prescription?: IPrescription;
  action: "create" | "update";
}

export const DoctorPrescriptionForm = ({ action, prescription }: IProps) => {
  const { bookingId } = useParams();

  const navigate = useNavigate();
  const { data: clinics } = useGetDoctorClinics();

  const clinicsOptions = clinics?.data?.map((clinic) => ({
    label: clinic.name,
    value: clinic.id.toString(),
  }));

  const { data: dosages } = useGetAllDosages({});
  const dosagesOptions =
    dosages?.data?.map((dosage) => ({
      label: dosage.name,
      value: dosage.name,
    })) ?? [];

  const form = useForm<z.infer<typeof prescriptionSchema>>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      prescriptables: prescription?.prescriptables.map((prescriptable) => ({
        type: prescriptable.type,
        name: prescriptable.name,
        drug_name: prescriptable.drug_name || "",
      })) || [
        {
          type: "scan",
          name: "",
          drug_name: "",
        },
      ],
      note: prescription?.note || "",
      prescription_date:
        prescription?.date ||
        new Date().toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      clinic_id: prescription?.clinic.id.toString() || "",
      patient_id: prescription?.patient.id.toString() || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prescriptables",
  });

  const prescriptableTypes = useWatch({
    control: form.control,
    name: fields.map((_, i) => `prescriptables.${i}.type` as const),
  }) as (TPrescriptableType | undefined)[];

  const { mutateAsync: createPrescription, isPending: isLoadingCreate } =
    useCreateDoctorPrescription();
  const { mutateAsync: updatePrescription, isPending: isLoadingUpdate } =
    useUpdateDoctorPrescription();

  const onSubmit = async (data: z.infer<typeof prescriptionSchema>) => {
    if (!bookingId && (!data.clinic_id || !data.patient_id)) {
      if (!data.clinic_id) toast.error("يرجي اختيار العيادة");
      if (!data.patient_id) toast.error("يرجي اختيار المريض");
      return;
    }

    try {
      if (action === "update") {
        const { message, status } = await updatePrescription({
          ...data,
          id: prescription?.id.toString() || "",
        });

        if (!status)
          return Swal.fire({
            icon: "error",
            title: "فشل",
            text: message,
          });

        Swal.fire({
          icon: "success",
          text: message,
          title: "تم",
        });
      }

      if (action === "create") {
        const { message, status } = await createPrescription({
          ...data,
          booking_id: bookingId,
        });

        if (!status)
          return Swal.fire({
            icon: "error",
            title: "فشل",
            text: message,
          });

        Swal.fire({
          icon: "success",
          text: message,
          title: "تم",
        });
      }

      navigate("/doctor/prescriptions");
      form.reset();
    } catch (error) {
      handleResErr(error);
    }
  };
  return (
    <FormProvider {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
        >
          {DOCTOR_PRESCRIPTIONS_INPUTS.map((input) => {
            if (
              bookingId &&
              (input.name === "patient_id" || input.name === "clinic_id")
            )
              return null;

            return (
              <motion.div
                variants={itemVariants}
                key={input.name}
                className={`${input.name === "note" ? "lg:col-span-2" : ""}`}
              >
                <RenderPrescriptionFormFields
                  form={form}
                  input={input}
                  schema={prescriptionSchema}
                  options={{
                    clinics: clinicsOptions || [],
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
        >
          {fields.map((field, idx) => {
            const type = prescriptableTypes[idx] ?? "dosage";

            return (
              <motion.div
                key={`${field.id}-${type}`}
                className="border-primary/10 hover:border-primary/30 space-y-3 rounded-lg border p-4 transition-all duration-500 ease-in-out"
                custom={idx}
                variants={itemVariants}
              >
                <FormField
                  control={form.control}
                  name={`prescriptables.${idx}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectFormItem
                          field={field}
                          input={{
                            name:
                              type === "scan"
                                ? "scan"
                                : type === "analysis"
                                  ? "analysis"
                                  : "dosage",
                            label: "نوع الروشتة",
                            type: "select",
                          }}
                          options={PRESCRIPTIONS_TYPES}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`prescriptables.${idx}.${
                    type === "dosage" ? "drug_name" : "name"
                  }`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {type === "scan"
                          ? "اسم الإشعة"
                          : type === "analysis"
                            ? "اسم التحليل"
                            : "اسم الدواء"}
                      </FormLabel>
                      <FormControl>
                        {type === "scan" ? (
                          <ScansSelectFormItem
                            field={field}
                            input={{
                              name: "name",
                              label: "اسم الإشعة",
                              type: "select",
                            }}
                          />
                        ) : type === "dosage" ? (
                          <DrugsSelectFormItem
                            field={field}
                            input={{
                              name: "drug_name",
                              label: "اسم الدواء",
                              type: "select",
                            }}
                          />
                        ) : (
                          <AnalysisSelectFormItem
                            field={field}
                            input={{
                              name: "name",
                              type: "select",
                              label: "اسم التحليل",
                              placeholder: "اسم التحليل",
                            }}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {type === "dosage" && (
                  <FormField
                    control={form.control}
                    name={`prescriptables.${idx}.name`}
                    render={({ field }) => (
                      <SelectFormItem
                        field={field}
                        options={dosagesOptions}
                        input={{
                          name: "name",
                          label: "اسم الجرعة",
                          type: "select",
                        }}
                      />
                    )}
                  />
                )}

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(idx)}
                  className="flex w-full items-center justify-center gap-2"
                >
                  حذف
                  <Delete size={18} />
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="text-destructive text-[0.8rem] font-medium">
          {form.formState.errors.prescriptables?.message ||
            form.formState.errors.prescriptables?.root?.message}
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة الروشتة"
            updateText="تحديث الروشتة"
          />
          <Button
            type="button"
            onClick={() => append({ type: "dosage", name: "", drug_name: "" })}
            className="w-full md:w-fit"
            variant={"outline"}
            size={"lg"}
          >
            إضافة عنصر جديد
          </Button>
        </div>
      </motion.form>
    </FormProvider>
  );
};
