import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "@/shared/components/ui/form";
import { useUploadImgHandler } from "@/shared/hooks/useUploadImgHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCreateEmployee, useUpdateEmployee } from "../queriesAndMutations";
import { useEffect, useState } from "react";
import {
  useCheckAuth,
  useGetAllPermissions,
} from "@/features/auth/queriesAndMutations";
import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/shared/animations";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/features/auth/authSlice";
import { RenderEmployeeFormFields } from "./RenderEmployeeFormFields";
import { handleResErr } from "@/shared/utils/handleResError";
import { type IEmployee } from "../types";
import { useGetAllTreasuries } from "../../treasuries";
import { EMPLOYEE_FORM_INPUTS } from "../constants";
import SubmitButton from "@/shared/components/SubmitButton";
import { useAppSelector } from "@/app/store";

interface IProps {
  employee?: IEmployee;
  action: "create" | "update";
  employeeSchema: ZodSchema;
}

export const EmployeeForm = ({ employee, action, employeeSchema }: IProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const currentEmployeeId = user?.user?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkAuthUser } = useCheckAuth();
  const [showPermissions, setShowPermissions] = useState(
    employee?.user?.role === "employee" || !employee
  );

  const { data: permissions } = useGetAllPermissions();
  const { mutateAsync: createEmployee, isPending: isLoadingCreate } =
    useCreateEmployee();
  const { mutateAsync: updateEmployee, isPending: isLoadingUpdate } =
    useUpdateEmployee();
  const { data: treasuries } = useGetAllTreasuries({});

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
      salary: employee?.salary != null ? employee.salary.toString() : "",
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
    const { auth, email_verified, status } = await checkAuthUser();
    if (!auth || !status) {
      dispatch(logout());
      navigate("/sign-in");
      if (!auth)
        return toast.warn(" تم تسجيل الخروج يرجى تسجيل الدخول مرة اخرى");
      if (!status) return toast.warn("حسابك غير مفعل يرجى التواصل مع الادارة");
    }

    if (!email_verified) {
      navigate("/verify-account");
      return toast.warn("يرجى تاكيد البريد الالكتروني");
    }
  };
  const role = useWatch({
    control: form.control,
    name: "role",
    defaultValue: employee?.user?.role || "employee",
  });

  useEffect(() => {
    setShowPermissions(role === "employee");
  }, [role]);

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
        });
        if (!status) return toast.error(message);
        toast.success("تم إضافة موظف جديد بنجاح");
      }

      if (action === "update") {
        const { status, message } = await updateEmployee({
          data: { ...formData, id: employee?.id },
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
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2"
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
