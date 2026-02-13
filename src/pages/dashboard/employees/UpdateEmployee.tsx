import EmployeeForm from "@/components/forms/dashboard/employees/EmployeeForm";
import { Card, CardContent } from "@/components/ui/card";
import { useGetEmployeeById } from "@/lib/react-query/dashboard/employees";
import cookieServices from "@/utils/cookieServices";
import { updateEmployeeSchema } from "@/validations/dashboard/employeeSchema";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/components/ui/DataLoader";
import { AxiosResErr } from "@/types";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { employeeId } = useParams();
  const {
    data: employee,
    isLoading,
    isError,
    failureReason,
  } = useGetEmployeeById({
    id: employeeId as string,
    token,
  });

  const employeeFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || employeeFailure?.response?.data.message) {
      toast.error(
        employeeFailure.response?.data.message || "فشل في تحميل بيانات الموظف"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, employeeFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {employee?.data?.name}
        </title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-none font-semibold tracking-tight">
              تحديث بيانات الموظف
            </h1>
          </div>
          <CardContent>
            <EmployeeForm
              action={"update"}
              employee={employee?.data}
              employeeSchema={updateEmployeeSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdateEmployee;
