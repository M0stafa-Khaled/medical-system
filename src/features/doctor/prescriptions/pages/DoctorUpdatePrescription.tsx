import { Card, CardContent } from "@/shared/components/ui/card";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { AxiosResErr } from "@/shared/types";
import { toast } from "react-toastify";
import DataLoader from "@/shared/components/ui/DataLoader";
import { useEffect } from "react";
import { useGetDoctorPrescriptionById } from "../../queriesAndMutations";
import { DoctorPrescriptionForm } from "../components/DoctorPrescriptionForm";

const DoctorUpdatePrescription = () => {
  const navigate = useNavigate();

  const { prescriptionId } = useParams();
  const {
    data: prescription,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorPrescriptionById({
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
        <Card className="border-muted">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-none font-semibold tracking-tight">
              تحديث بيانات الروشتة
            </h1>
          </div>
          <CardContent>
            <DoctorPrescriptionForm
              action={"update"}
              prescription={prescription?.data}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default DoctorUpdatePrescription;
