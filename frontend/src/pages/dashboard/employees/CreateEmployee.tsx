import EmployeeForm from "@/components/forms/dashboard/employees/EmployeeForm";
import { Card, CardContent } from "@/components/ui/card";
import { createEmployeeSchema } from "@/validations/employeeSchema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreateEmployee = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة موظف</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-relaxed">إضافة موظف جديد</h1>
          </div>
          <CardContent>
            <EmployeeForm
              action={"create"}
              employeeSchema={createEmployeeSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreateEmployee;
