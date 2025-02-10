import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { ADD_DOCTOR_FORM_INPUTS } from "@/constants";
import { IDoctor, IFormInput } from "@/interfaces";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import doctorSchema from "@/validations/doctorSchema";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAddDoctor, useUpdateDoctor } from "@/lib/react-query/doctors";
import { useNavigate } from "react-router-dom";

interface IProps {
  doctor?: IDoctor;
  action: "add" | "update";
}

const DoctorForm = ({ doctor, action }: IProps) => {
  const {
    id,
    name,
    personal_id,
    commission,
    first_phone,
    second_phone,
    status,
    user,
  } = doctor || {};

  const token = cookieServices.getToken() || "";
  const navigate = useNavigate();

  const { mutateAsync: addDoctor, isPending: isLoadingAdd } = useAddDoctor();
  const { mutateAsync: updateDoctor, isPending: isLoadingUpdate } =
    useUpdateDoctor();

  const form = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: name || "",
      personal_id: personal_id || "",
      first_phone: first_phone || "",
      second_phone: second_phone || "",
      email: user?.email || "",
      password: "",
      commission:
        commission?.toString().slice(0, commission?.toString().length - 1) ||
        "0",
      status: status || true,
      image: undefined,
      signature: undefined,
    },
  });

  const { handleFileChange } = useUploadImgHandler(form);

  const renderFormField = (input: IFormInput) => (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof doctorSchema>}
      render={
        input.type === "switch"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>حالة الطبيب</FormLabel>
                <div className="flex flex-row items-center justify-between rounded-lg border border-input p-3">
                  <FormLabel>{field.value ? " متاح " : " غير متاح "}</FormLabel>
                  <FormControl>
                    <Switch
                      dir="ltr"
                      checked={field.value as boolean | undefined}
                      onCheckedChange={field.onChange}
                      className="data-[state=unchecked]:bg-black/50 dark:data-[state=unchecked]:bg-white/50"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )
          : input.type === "file"
          ? ({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <Input
                      id={input.name}
                      type="file"
                      accept={input.accept}
                      onChange={(e) => handleFileChange(e, onChange)}
                      className="h-auto py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
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
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <FormControl>
                  <Input
                    id={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value as string | undefined}
                    className="py-3 placeholder:h-14 h-auto text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
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
          data: { ...formData, id: id },
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم تحديث بيانات الطبيب بنجاح");
      }
      navigate("/dashboard/doctors");
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
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        key={doctor?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {ADD_DOCTOR_FORM_INPUTS.map(renderFormField)}
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
        </Button>
      </form>
    </Form>
  );
};

export default DoctorForm;
