import DoctorForm from "@/components/forms/dashboard/doctors/DoctorForm";
import { Card, CardContent } from "@/components/ui/card";
import CreateDoctorSchema from "@/validations/createDoctorSchema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreateDoctor = () => {
  return (
    <>
      <Helmet>
        <title>EgProg | إضافة طبيب</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground border-gray-300 dark:border-muted shadow-none">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-relaxed">إضافة طبيب جديد</h1>
          </div>
          <CardContent>
            <DoctorForm action={"create"} doctorSchema={CreateDoctorSchema} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreateDoctor;
