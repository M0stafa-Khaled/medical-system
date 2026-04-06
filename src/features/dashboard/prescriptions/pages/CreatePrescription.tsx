import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/components/ui/card";
import { PrescriptionForm } from "../components/PrescriptionForm";
import { FileText } from "lucide-react";

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
        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">إضافة روشتة جديدة</h1>
              <p className="text-sm text-pink-100">إنشاء وصفة طبية للمريض</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="pt-6">
            <PrescriptionForm action={"create"} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default CreatePrescription;
