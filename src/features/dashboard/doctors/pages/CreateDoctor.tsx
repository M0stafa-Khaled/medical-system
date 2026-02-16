import { DoctorForm } from "@/features/dashboard/doctors/components/DoctorForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { createDoctorSchema } from "../schema";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CreateDoctor = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة طبيب</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">إضافة طبيب جديد</h1>
          </div>
          <CardContent>
            <DoctorForm action={"create"} doctorSchema={createDoctorSchema} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreateDoctor;
