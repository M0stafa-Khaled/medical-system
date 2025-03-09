import PatientForm from "@/components/forms/patients/PatientForm";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPatientById } from "@/lib/react-query/patients";
import cookieServices from "@/utils/cookieServices";
import updatePatientSchema from "@/validations/updatePatientSchema";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/components/ui/DataLoader";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { patientId } = useParams();
  const {
    data: patient,
    isLoading,
    isError,
  } = useGetPatientById({
    id: patientId as string,
    token: token as string,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات المريض");
      navigate("/dashboard/patients");
      return;
    }

    if (!patient?.status && patient?.message) {
      toast.error(patient.message);
      navigate("/dashboard/patients");
      return;
    }
  }, [isError, navigate, patientId, patient]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>EgProg | {patient?.data.name}</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="mt-10 dark:bg-foreground border-muted">
          <div className="flex flex-col space-y-1.5 p-6">
            <h1 className="font-semibold leading-none tracking-tight">
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
