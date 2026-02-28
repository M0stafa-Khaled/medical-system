import { containerVariants, itemVariants } from "@/shared/animations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import DataLoader from "@/shared/components/ui/DataLoader";
import { User2, UserCircle2, Building2, Calendar, Pen } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InfoField from "@/shared/components/InfoField";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { Button } from "@/shared/components/ui/button";
import { AxiosResErr } from "@/shared/types";
import { FaNotesMedical } from "react-icons/fa6";
import PrescriptibleList from "../components/prescriptables/PrescriptibleList";
import {
  useDeletePrescription,
  useGetPrescriptionById,
} from "../queriesAndMutations";
import { DeleteAlert } from "@/shared/components/delete-alert";

const PrescriptionDetails = () => {
  const canUpdatePrescription = useHasPermission(
    PERMISSIONS.UPDATE_PRESCRIPTION
  );
  const canDeletePrescription = useHasPermission(
    PERMISSIONS.DELETE_PRESCRIPTION
  );

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

  const { mutateAsync: deletePrescription } = useDeletePrescription();

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

  const { clinic, date, doctor, id, patient, note, prescriptables } =
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
        <Card className="border-muted">
          <CardHeader className="py-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                <span>تفاصيل الروشتة:</span>
              </CardTitle>
              <div className="flex gap-2">
                {canUpdatePrescription && (
                  <motion.div variants={itemVariants}>
                    <Button
                      asChild
                      size={"icon"}
                      className="btn-edit rounded-full"
                    >
                      <Link to={`/dashboard/prescriptions/${id}/update`}>
                        <Pen size={20} />
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {canDeletePrescription && (
                  <motion.div variants={itemVariants}>
                    <DeleteAlert
                      name={`روشتة المريض ${patient?.name}`}
                      deleteAction={() => deletePrescription({ id: `${id}` })}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="flex items-center">
                <Link to={`/dashboard/patients/${patient?.id}`}>
                  <InfoField
                    icon={<User2 className="text-primary h-5 w-5" size={20} />}
                    label="المريض"
                    value={patient?.name as string}
                  />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Link to={`/dashboard/doctors/${doctor?.id}`}>
                  <InfoField
                    icon={
                      <UserCircle2
                        className="h-5 w-5 text-blue-500"
                        size={20}
                      />
                    }
                    label="الطبيب"
                    value={doctor?.name as string}
                  />
                </Link>
              </motion.div>

              <InfoField
                icon={
                  <Building2 className="h-5 w-5 text-purple-500" size={20} />
                }
                label="العيادة"
                value={clinic?.name as string}
              />

              <InfoField
                icon={
                  <Calendar className="h-5 w-5 text-yellow-500" size={20} />
                }
                label="تاريخ إصدار الروشتة"
                value={date!}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 space-y-2">
              <div className="flex shrink-0 items-center gap-2">
                <FaNotesMedical className="h-5 w-5 text-purple-500" size={20} />
                <h5 className="text-muted-foreground text-nowrap">ملاحظات:</h5>
              </div>
              <div className="mr-8">
                <p className={`font-medium text-wrap`}>{note || "لا يوجد"}</p>
              </div>
            </motion.div>{" "}
          </CardContent>
        </Card>
        {/* Prescriptables */}
        <Card className="border-muted mt-3">
          <CardContent className="px-3 py-3">
            <PrescriptibleList prescriptables={prescriptables!} />
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default PrescriptionDetails;
