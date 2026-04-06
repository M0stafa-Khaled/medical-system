import { Card, CardContent } from "@/shared/components/ui/card";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/shared/components/ui/DataLoader";
import { AxiosResErr } from "@/shared/types";
import { useGetPatientById } from "../queriesAndMutations";
import { PatientForm } from "../components/PatientForm";
import { updatePatientSchema } from "../schema";
import { Users } from "lucide-react";

const UpdatePatient = () => {
  const navigate = useNavigate();

  const { patientId } = useParams();
  const {
    data: patient,
    isLoading,
    isError,
    failureReason,
  } = useGetPatientById({
    id: patientId as string,
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
        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-xl bg-linear-to-br from-sky-600 to-cyan-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Users className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold">
                تحديث بيانات المريض
              </h1>
              <p className="truncate text-sm text-sky-100">
                {patient?.data?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="pt-6">
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
