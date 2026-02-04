import PrescriptionForm from "@/components/forms/dashboard/prescription/PrescriptionForm";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import cookieServices from "@/utils/cookieServices";
import { AxiosResErr } from "@/types";
import { toast } from "react-toastify";
import DataLoader from "@/components/ui/DataLoader";
import { useEffect } from "react";
import { useGetPrescriptionById } from "@/lib/react-query/dashboard/prescriptions";

const UpdatePrescription = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;

  const { prescriptionId } = useParams();
  const {
    data: prescription,
    isLoading,
    isError,
    failureReason,
  } = useGetPrescriptionById({
    id: prescriptionId!,
    token,
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
        <Card className="mt-10 dark:bg-foreground border-muted">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-none tracking-tight">
              تحديث بيانات الروشتة
            </h1>
          </div>
          <CardContent>
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
