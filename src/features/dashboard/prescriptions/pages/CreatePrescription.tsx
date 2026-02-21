import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/components/ui/card";
import { PrescriptionForm } from "../components/PrescriptionForm";

const CreatePrescription = () => {
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | إضافة روشتة</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-muted mt-5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-relaxed font-semibold">إضافة روشتة جديدة</h1>
          </div>
          <CardContent>
            <PrescriptionForm action={"create"} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreatePrescription;
