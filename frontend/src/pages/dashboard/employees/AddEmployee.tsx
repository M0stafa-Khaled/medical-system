import EmployeeForm from "@/components/forms/employees/EmployeeForm";
import { Card, CardContent } from "@/components/ui/card";
import addEmployeeSchema from "@/validations/addEmployeeSchema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AddEmployee = () => {
  return (
    <>
      <Helmet>
        <title>EgProg | إضافة موظف</title>
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
            <EmployeeForm action={"add"} employeeSchema={addEmployeeSchema} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default AddEmployee;
