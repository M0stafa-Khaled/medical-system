import { containerVariants, itemVariants } from "@/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataLoader from "@/components/ui/DataLoader";
import cookieServices from "@/utils/cookieServices";
import { User2, Building2, Calendar, Pen } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InfoField from "@/components/shared/InfoField";
import { Button } from "@/components/ui/button";
import { AxiosResErr } from "@/types";
import DeletePrescription from "@/components/dashboard/prescriptions/DeletePrescription";
import { FaNotesMedical } from "react-icons/fa6";
import PrescriptablesList from "@/components/dashboard/prescriptions/prescriptables/PrescriptablesList";
import { useGetDoctorPrescriptionById } from "@/lib/react-query/doctor/prescriptions";

const DoctorPrescriptionDetails = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { prescriptionId } = useParams();

  const {
    data: prescription,
    isLoading,
    isError,
    failureReason,
  } = useGetDoctorPrescriptionById({
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

  const { clinic, date, id, patient, note, prescriptables } =
    prescription?.data || {};

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | {patient?.name || " "}
        </title>
      </Helmet>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs">
          <CardHeader className="py-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <CardTitle className="flex items-center gap-2 text-dark dark:text-white">
                <Calendar className="h-6 w-6 " />
                <span>تفاصيل الروشتة:</span>
              </CardTitle>
              <div className="flex gap-2">
                <motion.div variants={itemVariants}>
                  <Button className="h-auto py-0 px-0 bg-primary text-white dark:text-black gap-2 text-sm bg-blue-600 hover:bg-blue-700">
                    <Link
                      to={`/doctor/prescriptions/${id}/update`}
                      className="flex justify-center items-center gap-2 py-1 px-1 h-9 w-9 text-white"
                    >
                      <Pen size={20} />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DeletePrescription
                    name={patient?.name as string}
                    id={id?.toString() as string}
                  />
                </motion.div>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <InfoField
                icon={<User2 className="h-5 w-5 text-primary" />}
                label="المريض"
                value={patient?.name as string}
              />

              <InfoField
                icon={<Building2 className="h-5 w-5 text-purple-500" />}
                label="العيادة"
                value={clinic?.name as string}
              />

              <InfoField
                icon={<Calendar className="h-5 w-5 text-yellow-500" />}
                label="تاريخ إصدار الروشتة"
                value={date!}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 space-y-2">
              <div className="flex items-center gap-2 shrink-0">
                <FaNotesMedical className="h-5 w-5 text-purple-500" />
                <h5 className="text-muted-foreground text-nowrap">ملاحظات:</h5>
              </div>
              <div className="mr-8">
                <p
                  className={`font-medium text-wrap text-dark dark:text-white`}
                >
                  {note || "لا يوجد"}
                </p>
              </div>
            </motion.div>{" "}
          </CardContent>
        </Card>
        {/* Prescriptables */}
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs mt-3">
          <CardContent className="py-3 px-3">
            <PrescriptablesList prescriptables={prescriptables!} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default DoctorPrescriptionDetails;
