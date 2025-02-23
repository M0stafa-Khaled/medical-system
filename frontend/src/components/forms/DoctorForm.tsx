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
import { DOCTOR_FORM_INPUTS, GENDER } from "@/constants";
import { IDoctor } from "@/interfaces/doctor";
import { IFormInput } from "@/interfaces";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAddDoctor, useUpdateDoctor } from "@/lib/react-query/doctors";
import { useNavigate } from "react-router-dom";
import { useGetAllClinics } from "@/lib/react-query/clinics";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
interface IProps {
  doctor?: IDoctor;
  action: "add" | "update";
  doctorSchema: ZodSchema;
}

const DoctorForm = ({ doctor, action, doctorSchema }: IProps) => {
  const token = cookieServices.getToken() || "";
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: addDoctor, isPending: isLoadingAdd } = useAddDoctor();
  const { data: clinicsData } = useGetAllClinics(token as string);
  const { mutateAsync: updateDoctor, isPending: isLoadingUpdate } =
    useUpdateDoctor();

  const clinicsOptions = clinicsData?.data.map((clinic) => ({
    value: clinic.id.toString(),
    label: clinic.name,
  }));

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: doctor?.name || "",
      personal_id: doctor?.personal_id || "",
      first_phone: doctor?.first_phone || "",
      second_phone: doctor?.second_phone ? doctor.second_phone : "",
      email: doctor?.user?.email || "",
      register_id: doctor?.register_id || "",
      gender: {
        value: doctor?.gender || "male",
        label: doctor?.gender === "female" ? "أنثى" : "ذكر",
      },
      password: "",
      commission:
        doctor?.commission?.slice(0, doctor?.commission?.length - 1) || "0",
      status: Boolean(status) || true,
      image: undefined,
      signature: undefined,
      clinics:
        doctor?.clinics?.map((clinic) => ({
          value: clinic.id.toString(),
          label: clinic.name,
        })) || [],
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
  const renderFormField = (input: IFormInput) => (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof doctorSchema> as string}
      render={
        input.type === "switch"
          ? ({ field }) => (
              <FormItem>
                <FormLabel className="w-full">{input.label}</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border border-muted p-3.5">
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
          : input.name === "clinics"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    isMulti
                    options={clinicsOptions}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    styles={selectStyles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          : input.name === "gender"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Select
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
                      className="h-auto py-3 border-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
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
                    className="py-3 border-muted placeholder:h-14 h-auto text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
      }
    />
  );

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
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: theme === "dark" ? "#110f14" : "",
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
        key={doctor?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {DOCTOR_FORM_INPUTS.map(renderFormField)}
        </div>
        <Button
          type="submit"
          disabled={isLoadingAdd || isLoadingUpdate}
          className="py-6 w-full md:w-fit"
        >
          {action === "add"
            ? isLoadingAdd
              ? "جاري الإضافة"
              : "إضافة طبيب"
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

export default DoctorForm;
