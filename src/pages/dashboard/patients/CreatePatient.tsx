import PatientForm from "@/components/forms/dashboard/patients/PatientForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createPatientSchema } from "@/validations/dashboard/patientSchema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreatePatient = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة مريض</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground dark:border-muted border-gray-300 shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">إضافة مريض جديد</h1>
          </div>
          <CardContent>
            <PatientForm
              action={"create"}
              patientSchema={createPatientSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreatePatient;
