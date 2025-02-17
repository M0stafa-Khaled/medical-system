import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { GENDER, PATIENT_FORM_INPUTS } from "@/constants";
import { IFormInput } from "@/interfaces";
import { IPatient } from "@/interfaces/patient";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useAddPatient, useUpdatePatient } from "@/lib/react-query/patients";
import { useEffect } from "react";

interface IProps {
  patient?: IPatient;
  action: "add" | "update";
  patientSchema: ZodSchema;
}

const PatientForm = ({ patient, action, patientSchema }: IProps) => {
  const token = cookieServices.getToken() || "";
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: addPatient, isPending: isLoadingAdd } = useAddPatient();
  const { mutateAsync: updatePatient, isPending: isLoadingUpdate } =
    useUpdatePatient();

  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: patient?.name || "",
      another_name: patient?.another_name || "",
      personal_id: patient?.personal_id || "",
      first_phone: patient?.first_phone || "",
      second_phone: patient?.second_phone || "",
      email: patient?.user?.email || "",
      description: patient?.description || "",
      gender: {
        value: patient?.gender?.toLowerCase() || "male",
        label: patient?.gender?.toLowerCase() === "female" ? "أنثى" : "ذكر",
      },
      password: "",
      status: Boolean(patient?.status) || true,
      personal_image: undefined,
    },
  });

  useEffect(() => {
    if (!patient) return;
    form.reset({
      name: patient?.name,
      another_name: patient?.another_name || "",
      personal_id: patient?.personal_id,
      first_phone: patient?.first_phone,
      second_phone: patient?.second_phone || "",
      email: patient?.user?.email,
      description: patient?.description,
      gender: {
        value: patient?.gender?.toLowerCase(),
        label: patient?.gender?.toLowerCase() === "female" ? "أنثى" : "ذكر",
      },
      status: Boolean(patient?.status),
    });
  }, [form, patient]);

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) => {
    const optionalFields = ["another_name", "second_phone", "personal_image"];
    const updateOptionalFields = ["password", "email"];

    return (
      optionalFields.includes(fieldName) ||
      (action === "update" && updateOptionalFields.includes(fieldName))
    );
  };

  const renderFormField = (input: IFormInput) => (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof patientSchema> as string}
      render={
        input.type === "switch"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <div className="border-muted flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel>{field.value ? " مفعل " : " غير مفعل "}</FormLabel>
                  <FormControl>
                    <Switch
                      dir="ltr"
                      checked={field.value as boolean | undefined}
                      onCheckedChange={field.onChange}
                      className="data-[state=unchecked]:bg-black/50 data-[state=checked]:bg-green-700 dark:data-[state=unchecked]:bg-white/50 dark:data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )
          : input.name === "gender"
          ? ({ field }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    id={input.name}
                    {...field}
                    options={GENDER}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    styles={selectStyles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : input.type === "file"
          ? ({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>
                  {input.label}
                  {isOptionalField(input.name) && (
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      (اختياري)
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <Input
                      id={input.name}
                      type="file"
                      accept={input.accept}
                      onChange={(e) => handleFileChange(e, onChange)}
                      className="border-muted h-auto py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      {...field}
                      value={undefined}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : ({ field }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>
                  {input.label}
                  {isOptionalField(input.name) && (
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      (اختياري)
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value as string | undefined}
                    className="border-muted py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
      }
    />
  );

  const onSubmit = async (formData: z.infer<typeof patientSchema>) => {
    try {
      if (action === "add") {
        const { status, message } = await addPatient({
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

  const selectStyles: StylesConfig = {
    input: (baseStyles) => ({
      ...baseStyles,
      color: "#1e1c21",
      padding: "8px 0px",
    }),
    menu: (baseState) => ({
      ...baseState,
      color: theme === "dark" ? "#fafafa" : "",
    }),
    option: (baseStyle) => ({
      ...baseStyle,
      color: theme === "dark" ? "#110f14" : "",
      paddingTop: "12px",
      paddingBottom: "12px",
    }),
  };
  return (
    <Form {...form}>
      <form
        key={patient?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {PATIENT_FORM_INPUTS.map(renderFormField)}
        </div>

        <Button
          type="submit"
          disabled={isLoadingAdd || isLoadingUpdate}
          className="py-6 w-full md:w-fit"
        >
          {action === "add"
            ? isLoadingAdd
              ? "جاري الإضافة"
              : "إضافة مريض"
            : isLoadingUpdate
            ? "جاري تحديث البيانات"
            : "تحديث البيانات"}
          {(isLoadingAdd || isLoadingUpdate) && (
            <Loader2 className="animate-spin ml-2" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PatientForm;
