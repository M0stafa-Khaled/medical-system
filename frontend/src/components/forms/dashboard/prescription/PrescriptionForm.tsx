import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PRESCRIPTIONS_INPUTS, PRESCRIPTIONS_TYPES } from "@/constants";
import { IPrescription } from "@/interfaces/dashboard/prescription";
import handleResErr from "@/utils/handleResponseError";
import prescriptionSchema from "@/validations/dashboard/prescriptionSchema";
import { TPrescriptableType } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import RenderPrescriptionFormFields from "./RenderPrescriptionFormFields";
import { useGetAllClinics } from "@/lib/react-query/dashboard/clinics";
import cookieServices from "@/utils/cookieServices";
import { useGetAllClinicDoctors } from "@/lib/react-query/main";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreatePrescription,
  useUpdatePrescription,
} from "@/lib/react-query/dashboard/prescriptions";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import { useGetAllDosages } from "@/lib/react-query/dashboard/dosages";
import SelectFormItem from "../../formItems/SelectFormItem";
import ScansSelectFormItem from "../../formItems/ScansSelectFormItem";
import DrugsSelectFormItem from "../../formItems/DrugsSelectFormItem";
import AnalysisSelectFormItem from "../../formItems/AnalysisSelectFormItem";

interface IProps {
  prescription?: IPrescription;
  action: "create" | "update";
}
const PrescriptionForm = ({ action, prescription }: IProps) => {
  const { bookingId } = useParams();
  const [clinicId, setClinicId] = useState(
    prescription?.clinic.id.toString() || ""
  );
  const token = cookieServices.getToken()!;
  const navigate = useNavigate();
  const { data: clinics } = useGetAllClinics({
    token,
    filter: {
      status: "1",
    },
  });

  const clinicsOptions = clinics?.data?.map((clinic) => ({
    label: clinic.name,
    value: clinic.id.toString(),
  }));

  const { data: doctors } = useGetAllClinicDoctors({
    token,
    clinic_id: clinicId && !bookingId ? clinicId : "",
  });

  const doctorsOptions = doctors?.data?.map((doctor) => ({
    label: doctor.name,
    value: doctor.id.toString(),
  }));

  const { data: dosages } = useGetAllDosages({ token });
  const dosagesOptions = dosages?.data?.map((dosage) => ({
    label: dosage.name,
    value: dosage.name,
  }));

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prescriptables",
  });

  const { mutateAsync: createPrescription, isPending: isLoadingCreate } =
    useCreatePrescription();
  const { mutateAsync: updatePrescription, isPending: isLoadingUpdate } =
    useUpdatePrescription();

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
          token,
          prescription: {
            ...data,
            booking_id: bookingId,
          },
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

      navigate("/dashboard/prescriptions");
      form.reset();
    } catch (error) {
      handleResErr(error);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "clinic_id") {
        const clinicValue = value.clinic_id as string;
        setClinicId(clinicValue);
        // Reset values when change clinic
        form.setValue("doctor_id", "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                    clinics: clinicsOptions!,
                    doctors: doctorsOptions!,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {fields.map((field, idx) => {
            const type = form.watch(
              `prescriptables.${idx}.type` as "prescriptables"
            ) as unknown as TPrescriptableType;

            return (
              <motion.div
                key={`${field.id}-${type}`}
                className="space-y-3 border border-primary/10 hover:border-primary/30 transition-all duration-500 ease-in-out p-4 rounded-lg"
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
                            options={dosagesOptions!}
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
                  className="w-full flex justify-center items-center gap-2"
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
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            type="button"
            onClick={() => append({ type: "dosage", name: "", drug_name: "" })}
            className="py-6 w-full md:w-fit text-white bg-blue-600 hover:bg-blue-700"
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
