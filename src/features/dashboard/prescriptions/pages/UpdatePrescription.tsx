import { Card, CardContent } from "@/shared/components/ui/card";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { AxiosResErr } from "@/shared/types";
import { toast } from "react-toastify";
import DataLoader from "@/shared/components/ui/DataLoader";
import { useEffect } from "react";
import { useGetPrescriptionById } from "../queriesAndMutations.ts";
import { PrescriptionForm } from "../components/PrescriptionForm.tsx";
import { FileText } from "lucide-react";

const UpdatePrescription = () => {
  const navigate = useNavigate();

  const { prescriptionId } = useParams();
  const {
    data: prescription,
    isLoading,
    isError,
    failureReason,
  } = useGetPrescriptionById({
    id: prescriptionId!,
  });

  const prescriptionFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || prescriptionFailure?.response?.data.message) {
      toast.error(
        prescriptionFailure.response?.data.message ||
          "فشل في تحميل بيانات الروشتة"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, prescriptionFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_WEB_NAME} | تحديث روشتة</title>
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
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold">تحديث بيانات الروشتة</h1>
              <p className="truncate text-sm text-pink-100">تعديل الوصفة الطبية</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="pt-6">
            <PrescriptionForm
              action={"update"}
              prescription={prescription?.data}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdatePrescription;
