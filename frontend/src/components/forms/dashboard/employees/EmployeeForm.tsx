import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/components/ui/form";
import { EMPLOYEE_FORM_INPUTS } from "@/constants";
import { IEmployee } from "@/interfaces/dashboard/employee";
import { useUploadImgHandler } from "@/hooks/useUploadImgHandler";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useCreateEmployee,
  useUpdateEmployee,
} from "@/lib/react-query/dashboard/employees";
import { useEffect, useState } from "react";
import {
  useCheckAuth,
  useGetAllPermissions,
} from "@/lib/react-query/auth/auth";
import SubmitButton from "../../../shared/SubmitButton";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/animations";
import { useDispatch } from "react-redux";
import {
  clearPermissions,
  setPermissions,
} from "@/store/features/permissions/permissionsSlice";
import { logout } from "@/store/features/auth/authSlice";
import { useGetAllTreasuries } from "@/lib/react-query/dashboard/treasuries";
import RenderEmployeeFormFields from "./RenderEmployeeFormFields";
import handleResErr from "@/utils/handleResponseError";
interface IProps {
  employee?: IEmployee;
  action: "create" | "update";
  employeeSchema: ZodSchema;
}

const EmployeeForm = ({ employee, action, employeeSchema }: IProps) => {
  const token = cookieServices.getToken()!;
  const currentEmployeeId = cookieServices.getUser()?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const [showPermissions, setShowPermissions] = useState(
    employee?.user?.role === "employee" || !employee
  );

  const { data: permissions } = useGetAllPermissions(token!);
  const { mutateAsync: createEmployee, isPending: isLoadingCreate } =
    useCreateEmployee();
  const { mutateAsync: updateEmployee, isPending: isLoadingUpdate } =
    useUpdateEmployee();
  const { data: treasuries } = useGetAllTreasuries({ token });

  const treasuriesOptions = treasuries?.data.map((treasury) => ({
    value: treasury?.id.toString(),
    label: treasury?.name,
  }));

  const permissionsOptions = permissions?.data.map((permission) => ({
    value: permission.id.toString(),
    label: permission.name,
  }));

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee?.name || "",
      personal_id: employee?.personal_id || "",
      first_phone: employee?.first_phone || "",
      second_phone: employee?.second_phone || "",
      salary: employee?.salary ? `${employee?.salary}` : "",
      email: employee?.user?.email || "",
      job: employee?.job || "",
      gender: employee?.gender?.toLowerCase() || "male",
      password: "",
      status: Boolean(employee?.status) || true,
      treasury_id: employee?.treasury?.id.toString() || "",
      role: employee?.user?.role || "employee",
      permissions: employee?.permissions?.map((p) => p.id.toString()) || [],
      image: undefined,
      personal_image: undefined,
    },
  });

  const checkAuth = async () => {
    const { auth, email_verified, status, permissions } = await checkAuthUser(
      token
    );
    if (!auth || !status) {
      dispatch(logout());
      dispatch(clearPermissions());
      navigate("/login");
      if (!auth)
        return toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
      if (!status) return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
    }

    if (!email_verified) {
      navigate("/verify-account");
      return toast.warn("يرجى تاكيد البريد الالكتروني");
    }

    // Set Permissions in state
    dispatch(setPermissions(permissions));
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "role") {
        setShowPermissions(value.role === "employee");
      }
    });
    return () => subscription.unsubscribe();
  }, [form, employee, treasuries]);

  const { handleFileChange } = useUploadImgHandler(form);

  const isOptionalField = (fieldName: string) => {
    const optionalFields = [
      "second_phone",
      "image",
      "personal_image",
      "treasury_id",
    ];
    const updateOptionalFields = ["password", "email", "permissions"];

    return (
      optionalFields.includes(fieldName) ||
      (action === "update" && updateOptionalFields.includes(fieldName))
    );
  };

  const onSubmit = async (formData: z.infer<typeof employeeSchema>) => {
    try {
      if (action === "create") {
        const { status, message } = await createEmployee({
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

        if (employee?.id === currentEmployeeId) checkAuth();
        toast.success("تم تحديث بيانات الموظف بنجاح");
      }

      navigate(-1);
      form.reset();
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        key={employee?.id || "create"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 dark:text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
          variants={containerVariants}
        >
          {EMPLOYEE_FORM_INPUTS.map((input, index) =>
            input.name === "permissions" && !showPermissions ? null : (
              <motion.div
                key={input.name}
                custom={index}
                variants={itemVariants}
                className={`${
                  input.name === "permissions" ? "col-span-full" : ""
                }`}
              >
                <RenderEmployeeFormFields
                  input={input}
                  form={form}
                  handleFileChange={handleFileChange}
                  isOptionalField={isOptionalField}
                  schema={employeeSchema}
                  options={{
                    treasuries: treasuriesOptions!,
                    permissions: permissionsOptions!,
                  }}
                />
              </motion.div>
            )
          )}
        </motion.div>
        <motion.div variants={containerVariants}>
          <SubmitButton
            action={action}
            isLoadingCreate={isLoadingCreate}
            isLoadingUpdate={isLoadingUpdate}
            createText="إضافة موظف"
            updateText="تحديث بيانات الموظف"
          />
        </motion.div>
      </motion.form>
    </Form>
  );
};

export default EmployeeForm;
