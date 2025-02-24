import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/components/ui/form";
import { EMPLOYEE_FORM_INPUTS } from "@/constants";
import { IEmployee } from "@/interfaces/employee";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAddEmployee, useUpdateEmployee } from "@/lib/react-query/employees";
import { useEffect, useState } from "react";
import { useCheckAuth, useGetAllPermissions } from "@/lib/react-query/auth";
import SubmitButton from "../SubmitButton";
import { motion } from "framer-motion";
import {
  FormItemVariants,
  formVariants,
} from "@/animations/dashboardAnimations";
import RenderFormFields from "../RenderFormFields";
import { useDispatch } from "react-redux";
import { setPermissions } from "@/app/features/permissions/permissionsSlice";
import { logout } from "@/app/features/auth/authSlice";

interface IProps {
  employee?: IEmployee;
  action: "add" | "update";
  employeeSchema: ZodSchema;
}

const EmployeeForm = ({ employee, action, employeeSchema }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const [showPermissions, setShowPermissions] = useState(
    employee?.user?.role === "employee" || !employee
  );
  const token = cookieServices.getToken() || "";

  const { data: permissions } = useGetAllPermissions(token!);
  const { mutateAsync: addEmployee, isPending: isLoadingAdd } =
    useAddEmployee();
  const { mutateAsync: updateEmployee, isPending: isLoadingUpdate } =
    useUpdateEmployee();

  const permissionsOptions = permissions?.data.map((permission) => ({
    value: permission.id.toString(),
    label: permission.name,
  }));

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      personal_id: "",
      first_phone: "",
      second_phone: "",
      salary: "",
      email: "",
      job: "",
      gender: {
        value: "male",
        label: "ذكر",
      },
      password: "",
      status: true,
      image: undefined,
      personal_image: undefined,
      role: {
        value: "employee",
        label: "موظف",
      },
      permissions: [],
    },
  });

  const checkAuth = async () => {
    const { auth, email_verified, status, permissions } = await checkAuthUser(
      token as string
    );
    if (!auth) {
      dispatch(logout());
      navigate("/login");
      return toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
    }

    // Set Permissions in state
    dispatch(setPermissions(permissions));

    if (!status) {
      navigate("/not-active");
      return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
    }

    if (!email_verified) {
      navigate("/verify-email");
      return toast.warn("يرجى تاكيد البريد الالكتروني");
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "role") {
        setShowPermissions(value.role?.value === "employee");
      }
    });
    if (!employee) return () => subscription.unsubscribe();
    form.reset({
      name: employee?.name || "",
      personal_id: employee?.personal_id || "",
      first_phone: employee?.first_phone || "",
      second_phone: employee?.second_phone || "",
      salary: employee?.salary ? `${employee?.salary}` : "",
      email: employee?.user?.email || "",
      job: employee?.job || "",
      gender: {
        value: employee?.gender?.toLowerCase(),
        label: employee?.gender?.toLowerCase() === "female" ? "أنثى" : "ذكر",
      },
      password: "",
      status: Boolean(employee?.status),
      role: {
        value: employee?.user?.role || "employee",
        label: employee?.user?.role === "admin" ? "مسؤول" : "موظف",
      },
      permissions:
        employee?.permissions?.map((p) => ({
          value: p.id.toString(),
          label: p.name,
        })) || [],
    });

    return () => subscription.unsubscribe();
  }, [form, employee]);

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) => {
    const optionalFields = ["second_phone", "image", "personal_image"];
    const updateOptionalFields = ["password", "email", "permissions"];

    return (
      optionalFields.includes(fieldName) ||
      (action === "update" && updateOptionalFields.includes(fieldName))
    );
  };

  const onSubmit = async (formData: z.infer<typeof employeeSchema>) => {
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
          data: { ...formData, id: employee?.id },
          token,
        });
        if (!status) return toast.error(message);
        checkAuth();
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

  return (
    <Form {...form}>
      <motion.form
        key={employee?.id || "add"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {showPermissions && (
          <motion.div variants={formVariants}>
            <RenderFormFields
              schema={employeeSchema}
              form={form}
              input={{
                name: "permissions",
                label: "الصلاحيات",
                type: "multiselect",
              }}
              options={permissionsOptions}
              handleFileChange={handleFileChange}
              isOptionalField={isOptionalField}
            />
          </motion.div>
        )}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
          variants={formVariants}
        >
          {EMPLOYEE_FORM_INPUTS.map((input, index) => (
            <motion.div
              key={input.name}
              custom={index}
              variants={FormItemVariants}
            >
              <RenderFormFields
                input={input}
                form={form}
                handleFileChange={handleFileChange}
                isOptionalField={isOptionalField}
                schema={employeeSchema}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={formVariants}>
          <SubmitButton
            action={action}
            isLoadingAdd={isLoadingAdd}
            isLoadingUpdate={isLoadingUpdate}
            addText="إضافة موظف"
            updateText="تحديث بيانات الموظف"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default EmployeeForm;
