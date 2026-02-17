import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { PRESCRIPTIONS_INPUTS, PRESCRIPTIONS_TYPES } from "@/constants";
import { IPrescription } from "@/interfaces/dashboard/prescription";
import { handleResErr } from "@/shared/utils/handleResError";
import prescriptionSchema from "@/validations/dashboard/prescriptionSchema";
import { TPrescriptableType } from "@/shared/types";
import { useNavigate, useParams } from "react-router";
import { Delete } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import RenderPrescriptionFormFields from "./RenderPrescriptionFormFields";
import cookieServices from "@/shared/utils/cookieServices";
import { useGetAllClinicDoctors } from "@/shared/lib/react-query/main";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreatePrescription,
  useUpdatePrescription,
} from "@/shared/lib/react-query/dashboard/prescriptions";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { useGetAllDosages } from "@/features/dosages/queriesAndMutations";
import SelectFormItem from "../../formItems/SelectFormItem";
import ScansSelectFormItem from "../../formItems/ScansSelectFormItem";
import DrugsSelectFormItem from "../../formItems/DrugsSelectFormItem";
import AnalysisSelectFormItem from "../../formItems/AnalysisSelectFormItem";
import { useWatch } from "react-hook-form";
import { useGetAllClinics } from "@/features/dashboard/clinics";

interface IProps {
  prescription?: IPrescription;
  action: "create" | "update";
}

const PrescriptionForm = ({ action, prescription }: IProps) => {
  const { bookingId } = useParams();
  const token = cookieServices.getToken()!;
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

  // Watch clinic_id directly
  const clinicId = useWatch({
    control: form.control,
    name: "clinic_id",
  });

  const { data: clinics } = useGetAllClinics({
    token,
    filter: {
      status: "1",
    },
  });

  const clinicsOptions =
    clinics?.data?.map((clinic) => ({
      label: clinic.name,
      value: clinic.id.toString(),
    })) ?? [];

  // Use watched clinicId directly (skip query if empty or in booking mode)
  const { data: doctors } = useGetAllClinicDoctors({
    token,
    clinic_id: clinicId && !bookingId ? clinicId : "",
  });

  const doctorsOptions =
    doctors?.data?.map((doctor) => ({
      label: doctor.name,
      value: doctor.id.toString(),
    })) ?? [];

  const { data: dosages } = useGetAllDosages({ token });
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
          token,
          prescription: data,
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
          token,
          prescription: {
            ...data,
            booking_id: bookingId,
          },
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
                <FormItem>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name={`prescriptables.${idx}.type`}
                      render={({ field }) => (
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
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>
                    {type === "scan"
                      ? "اسم الإشعة"
                      : type === "analysis"
                        ? "اسم التحليل"
                        : "اسم الدواء"}
                  </FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name={`prescriptables.${idx}.${
                        type === "dosage" ? "drug_name" : "name"
                      }`}
                      render={({ field }) =>
                        type === "scan" ? (
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
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage>
                    {
                      form.formState.errors.prescriptables?.[idx]?.[
                        type === "dosage" ? "drug_name" : "name"
                      ]?.message
                    }
                  </FormMessage>
                </FormItem>

                {type === "dosage" && (
                  <FormItem>
                    <FormControl>
                      <Controller
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
                    </FormControl>
                    <FormMessage>
                      {
                        form.formState.errors.prescriptables?.[idx]?.name
                          ?.message
                      }
                    </FormMessage>
                  </FormItem>
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

        <FormMessage>
          {form.formState.errors.prescriptables?.message ||
            form.formState.errors.prescriptables?.root?.message}
        </FormMessage>

        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            type="button"
            onClick={() => append({ type: "dosage", name: "", drug_name: "" })}
            className="w-full bg-blue-600 py-6 text-white hover:bg-blue-700 md:w-fit"
          >
            إضافة عنصر جديد
          </Button>

          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة الروشتة"
            updateText="تحديث الروشتة"
          />
        </div>
      </motion.form>
    </FormProvider>
  );
};

export default PrescriptionForm;
