import { EmployeeForm } from "../components/EmployeeForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createEmployeeSchema } from "../schema";
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
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">إضافة موظف جديد</h1>
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
