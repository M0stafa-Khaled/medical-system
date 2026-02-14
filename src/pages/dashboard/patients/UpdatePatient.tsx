import PatientForm from "@/components/forms/dashboard/patients/PatientForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useGetPatientById } from "@/shared/lib/react-query/dashboard/patients";
import cookieServices from "@/shared/utils/cookieServices";
import { updatePatientSchema } from "@/validations/dashboard/patientSchema";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/shared/components/ui/DataLoader";
import { AxiosResErr } from "@/shared/types";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { patientId } = useParams();
  const {
    data: patient,
    isLoading,
    isError,
    failureReason,
  } = useGetPatientById({
    id: patientId as string,
    token: token as string,
  });

  const patientFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || patientFailure?.response?.data.message) {
      toast.error(
        patientFailure.response?.data.message || "فشل في تحميل بيانات المريض"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, patientFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {patient?.data?.name}
        </title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="dark:bg-foreground border-muted mt-10">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="leading-none font-semibold tracking-tight">
              تحديث بيانات المريض
            </h1>
          </div>
          <CardContent>
            <PatientForm
              action={"update"}
              patient={patient?.data}
              patientSchema={updatePatientSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdatePatient;
