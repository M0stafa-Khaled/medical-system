import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPencil } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import {
  BadgeInfo,
  FileImage,
  Info,
  Mail,
  Phone,
  UserCircle2,
  Users,
  VenusAndMars,
} from "lucide-react";
import ImageModal from "@/components/shared/ImageModal";
import { useGetPatientById } from "@/lib/react-query/dashboard/patients";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import DeletePatientButton from "@/components/dashboard/patients/DeletePatientModalButton";
import InfoField from "@/components/dashboard/InfoField";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { Calendar, BadgeCheck, BadgeX } from "lucide-react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/animations/dashboardAnimations";
import DataLoader from "@/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";

const PatientDetails = () => {
  const canEditPatient = useHasPermission(PERMISSIONS.EDIT_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);

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
      toast.error("فشل في تحميل بيانات الموظف");
      navigate("/dashboard/employees");
      return;
    }

    if (!patient?.status && patient?.message) {
      toast.error(patient.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [patient, isError, navigate]);

  if (isLoading) return <DataLoader />;

  const {
    id,
    first_phone,
    second_phone,
    name,
    created_at,
    status,
    personal_id,
    user,
    gender,
    personal_image,
    another_name,
    info_status,
    description,
  } = patient?.data || {};

  return (
    <>
      <Helmet>
        <title>EgProg | {name || " "}</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
          <CardHeader className="py-4">
            <motion.div variants={itemVariants}>
              <ProfileHeader
                name={name!}
                role={user?.role.toLowerCase() as string}
                actionButtons={
                  <>
                    {canEditPatient && (
                      <motion.div variants={itemVariants}>
                        <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                          <Link
                            to={`/dashboard/patients/${id}/update`}
                            className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                          >
                            <FaPencil size={18} />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                    {canDeletePatient && (
                      <motion.div variants={itemVariants}>
                        <DeletePatientButton id={id!} name={name!} />
                      </motion.div>
                    )}
                  </>
                }
              />
            </motion.div>
          </CardHeader>
          <motion.div variants={itemVariants} className="px-4">
            <Separator className="w-2/6 bg-muted mx-auto sm:mx-0" />
          </motion.div>
          <CardContent className="py-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    status ? (
                      <BadgeCheck className="text-green-500" />
                    ) : (
                      <BadgeX className="text-red-500" />
                    )
                  }
                  label="حالة الحساب"
                  value={status ? "مفعل" : "غير مفعل"}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Info className="text-blue-700" />}
                  label="ملاحظات حالة الحساب"
                  value={info_status!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Users className="text-blue-700" />}
                  label="اسم احد الاقارب"
                  value={another_name!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<BadgeInfo className="text-primary" />}
                  label="ملاحظات"
                  value={description!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<UserCircle2 className="text-primary" />}
                  label="رقم الهوية"
                  value={personal_id!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-green-600" />}
                  label="رقم الهاتف الاول"
                  value={first_phone!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Phone className="text-purple-600" />}
                  label="رقم الهاتف الثاني"
                  value={second_phone ? second_phone : "لا يوجد"}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Mail className="text-orange-500" />}
                  label="البريد الإلكتروني"
                  value={user?.email as string}
                  sm
                  breakAll
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الجنس"
                  value={gender?.toLowerCase() === "male" ? "ذكر" : "انثى"}
                  sm
                  icon={<VenusAndMars className="text-primary" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Calendar className="text-teal-500" />}
                  label="تاريخ الإنشاء"
                  value={formatDateTime(created_at!)}
                  sm
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 select-none"
              >
                <FileImage className="text-cyan-500" />
                <h5 className="text-sm text-muted-foreground">صورة الهوية :</h5>
                {personal_image ? (
                  <ImageModal
                    src={personal_image}
                    alt="صورة الهوية"
                    showThumbnail={false}
                    trigger={<Button size={"sm"}>عرض الصورة</Button>}
                  />
                ) : (
                  <p>لا يوجد صورة</p>
                )}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default PatientDetails;
