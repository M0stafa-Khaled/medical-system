import { useForm, useFieldArray, FormProvider } from "react-hook-form";
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
import { PRESCRIPTIONS_TYPES } from "@/shared/constants/index.ts";
import { IPrescription } from "../types";
import { handleResErr } from "@/shared/utils/handleResError";
import { prescriptionSchema } from "../schema.ts";
import { TPrescriptableType } from "@/shared/types";
import { useNavigate, useParams } from "react-router";
import { Delete } from "lucide-react";
import SubmitButton from "@/shared/components/SubmitButton.tsx";
import { useWatch } from "react-hook-form";
import { useGetAllClinics } from "@/features/dashboard/clinics";
import { useGetAllDosages } from "@/features/dosages";
import {
  useCreatePrescription,
  useUpdatePrescription,
} from "../queriesAndMutations.ts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { containerVariants, itemVariants } from "@/shared/animations/index";
import { RenderPrescriptionFormFields } from "./RenderPrescriptionFormFields";
import SelectFormItem from "@/shared/components/formItems/SelectFormItem.tsx";
import DrugsSelectFormItem from "@/shared/components/formItems/DrugsSelectFormItem.tsx";
import ScansSelectFormItem from "@/shared/components/formItems/ScansSelectFormItem.tsx";
import AnalysisSelectFormItem from "@/shared/components/formItems/AnalysisSelectFormItem.tsx";
import { PRESCRIPTIONS_INPUTS } from "../constants.ts";
import { useGetAllClinicDoctors } from "@/shared/queriesAndMutations.ts";

interface IProps {
  prescription?: IPrescription;
  action: "create" | "update";
}

export const PrescriptionForm = ({ action, prescription }: IProps) => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

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
      doctor_id: prescription?.doctor.id.toString() || "",
      patient_id: prescription?.patient.id.toString() || "",
    },
  });

  const clinicId = useWatch({
    control: form.control,
    name: "clinic_id",
  });

  const { data: clinics } = useGetAllClinics({
    filter: {
      status: "1",
    },
  });

  const clinicsOptions =
    clinics?.data?.map((clinic) => ({
      label: clinic.name,
      value: clinic.id.toString(),
    })) ?? [];

  const { data: doctors } = useGetAllClinicDoctors({
    clinic_id: clinicId && !bookingId ? clinicId : "",
  });

  const doctorsOptions =
    doctors?.data?.map((doctor) => ({
      label: doctor.name,
      value: doctor.id.toString(),
    })) ?? [];

  const { data: dosages } = useGetAllDosages({});
  const dosagesOptions =
    dosages?.data?.map((dosage) => ({
      label: dosage.name,
      value: dosage.name,
    })) ?? [];

  const { mutateAsync: createPrescription, isPending: isLoadingCreate } =
    useCreatePrescription();
  const { mutateAsync: updatePrescription, isPending: isLoadingUpdate } =
    useUpdatePrescription();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prescriptables",
  });

  const prescriptableTypes = useWatch({
    control: form.control,
    name: fields.map((_, i) => `prescriptables.${i}.type` as const),
  }) as (TPrescriptableType | undefined)[];

  // Reset doctor_id when clinic changes
  useEffect(() => {
    if (clinicId) {
      form.setValue("doctor_id", "");
    }
  }, [clinicId, form]);

  const onSubmit = async (data: z.infer<typeof prescriptionSchema>) => {
    if (
      !bookingId &&
      (!data.clinic_id || !data.doctor_id || !data.patient_id)
    ) {
      if (!data.clinic_id) toast.error("يرجي اختيار العيادة");
      if (!data.doctor_id) toast.error("يرجي اختيار الطبيب");
      if (!data.patient_id) toast.error("يرجي اختيار المريض");
      return;
    }

    try {
      if (action === "update") {
        const { message, status } = await updatePrescription({
          ...data,
          id: prescription?.id.toString() || "",
        });

        if (!status) {
          return Swal.fire({
            icon: "error",
            title: "فشل",
            text: message,
          });
        }

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

        if (!status) {
          return Swal.fire({
            icon: "error",
            title: "فشل",
            text: message,
          });
        }

        Swal.fire({
          icon: "success",
          text: message,
          title: "تم",
        });
      }

      navigate("/dashboard/prescriptions");
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
          {PRESCRIPTIONS_INPUTS.map((input) => {
            if (
              bookingId &&
              (input.name === "patient_id" ||
                input.name === "doctor_id" ||
                input.name === "clinic_id")
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
                    clinics: clinicsOptions,
                    doctors: doctorsOptions,
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
