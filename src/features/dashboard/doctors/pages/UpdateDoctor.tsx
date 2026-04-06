import { DoctorForm } from "@/features/dashboard/doctors/components/DoctorForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DataLoader from "@/shared/components/ui/DataLoader";
import { AxiosResErr } from "@/shared/types";
import { useGetDoctorById } from "../queriesAndMutations";
import { updateDoctorSchema } from "../schema";
import { Stethoscope } from "lucide-react";

const UpdateDoctor = () => {
  const navigate = useNavigate();

  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorById({
    id: doctorId!,
  });

  const doctorFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || doctorFailure?.response?.data.message) {
      toast.error(
        doctorFailure.response?.data.message || "فشل في تحميل بيانات الطبيب"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, doctorFailure]);

  if (isLoading) return <DataLoader />;

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | د / {doctor?.data.name}
        </title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header Card */}
        <div className="mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold">تحديث بيانات الطبيب</h1>
              <p className="truncate text-sm text-cyan-100">د / {doctor?.data.name}</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="pt-6">
            <DoctorForm
              action={"update"}
              doctor={doctor?.data}
              doctorSchema={updateDoctorSchema}
            />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default UpdateDoctor;
