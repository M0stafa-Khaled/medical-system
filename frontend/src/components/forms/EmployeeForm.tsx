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
import { EMPLOYEE_FORM_INPUTS, GENDER, ROLES } from "@/constants";
import { IEmployee, IFormInput } from "@/interfaces";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useAddEmployee, useUpdateEmployee } from "@/lib/react-query/employees";
interface IProps {
  employee?: IEmployee;
  action: "add" | "update";
  employeeSchema: ZodSchema;
}

const EmployeeForm = ({ employee, action, employeeSchema }: IProps) => {
  const {
    id,
    name,
    personal_id,
    first_phone,
    second_phone,
    status,
    salary,
    gender,
    jop,
    user,
  } = employee || {};

  const token = cookieServices.getToken() || "";
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: addEmployee, isPending: isLoadingAdd } =
    useAddEmployee();
  const { mutateAsync: updateEmployee, isPending: isLoadingUpdate } =
    useUpdateEmployee();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: name || "",
      personal_id: personal_id || "",
      first_phone: first_phone || "",
      second_phone: second_phone || "",
      salary: salary || "",
      email: user?.email || "",
      jop: jop || "",
      gender: {
        value: gender || "male",
        label: gender === "female" ? "أنثى" : "ذكر",
      },
      password: "",
      status: Boolean(status) || true,
      image: undefined,
      personal_image: undefined,
      role: {
        value: user?.role || "employee",
        label: user?.role === "admin" ? "مسؤول" : "موظف",
      },
    },
  });
  console.log(form.formState.errors);
  const { handleFileChange } = useUploadImgHandler(form);

  const renderFormField = (input: IFormInput) => (
    <FormField
      key={input.name}
      control={form.control}
      name={input.name as keyof z.infer<typeof employeeSchema> as string}
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
          : input.name === "role"
          ? ({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={ROLES}
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
                  {(input.name === "image" ||
                    input.name === "personal_image") && (
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
                  {(input.name === "password" || input.name === "email") &&
                    action === "update" && (
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

  const onSubmit = async (formData: z.infer<typeof employeeSchema>) => {
    console.log(formData);
    try {
      if (action === "add") {
        const { status, message } = await addEmployee({
          data: formData,
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم إضافة موظف جديد بنجاح");
      }

      if (action === "update") {
        const { status, message } = await updateEmployee({
          data: { ...formData, id: id },
          token,
        });
        if (!status) return toast.error(message);
        toast.success("تم تحديث بيانات الموظف بنجاح");
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
        key={employee?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {EMPLOYEE_FORM_INPUTS.map(renderFormField)}
        </div>

        <Button
          type="submit"
          disabled={isLoadingAdd || isLoadingUpdate}
          className="py-6 w-full md:w-fit"
        >
          {action === "add"
            ? isLoadingAdd
              ? "جاري الإضافة"
              : "إضافة موظف"
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

export default EmployeeForm;
