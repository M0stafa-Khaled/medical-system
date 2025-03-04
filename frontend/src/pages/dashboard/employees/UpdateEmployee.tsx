import EmployeeForm from "@/components/forms/employees/EmployeeForm";
import { Card, CardContent } from "@/components/ui/card";
import { useGetEmployeeById } from "@/lib/react-query/employees";
import cookieServices from "@/utils/cookieServices";
import updateEmployeeSchema from "@/validations/updateEmployeeSchema";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { employeeId } = useParams();
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeById({
    id: employeeId as string,
    token,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الموظف");
      navigate("/dashboard/employees");
      return;
    }

    if (!employee?.status && employee?.message) {
      toast.error(employee.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [isError, navigate, employeeId, employee]);

  if (isLoading)
    return (
      <div className="mt-20 text-black dark:text-white flex justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>EgProg | {employee?.data.name}</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="mt-10 dark:bg-foreground border-muted">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-none tracking-tight">
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
