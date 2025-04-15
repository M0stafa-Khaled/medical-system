import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import {
  BadgeInfo,
  FileImage,
  Info,
  Mail,
  Pen,
  Phone,
  UserCircle2,
  Users,
  VenusAndMars,
} from "lucide-react";
import ImageModal from "@/components/shared/ImageModal";
import { useGetPatientById } from "@/lib/react-query/dashboard/patients";
import HeaderUserDetails from "@/components/dashboard/HeaderUserDetails";
import DeletePatient from "@/components/dashboard/patients/DeletePatient";
import InfoField from "@/components/dashboard/InfoField";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { Calendar, BadgeCheck, BadgeX } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientBalances from "@/components/dashboard/patients/patientBalances/PatientBalances";

const PatientDetails = () => {
  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);

  const canViewPatientBalances = useHasPermission(PERMISSIONS.PATIENT_BALANCES);

  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { patientId } = useParams();

  const {
    data: patient,
    isLoading,
    isError,
  } = useGetPatientById({
    id: patientId!,
    token,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الموظف");
      navigate("/dashboard/employees");
      return;
    }
  }, [isError, navigate]);

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
        <title>
          {import.meta.env.VITE_WEB_NAME} | {name || " "}
        </title>
      </Helmet>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
          <CardHeader className="py-4">
            <motion.div variants={itemVariants}>
              <HeaderUserDetails
                name={name!}
                role={user?.role.toLowerCase() as string}
                actionButtons={
                  <>
                    {canUpdatePatient && (
                      <motion.div variants={itemVariants}>
                        <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                          <Link
                            to={`/dashboard/patients/${id}/update`}
                            className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                          >
                            <Pen size={20} />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                    {canDeletePatient && (
                      <motion.div variants={itemVariants}>
                        <DeletePatient id={id!} name={name!} />
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

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  value={status ? "نشط" : "غير نشط"}
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

        <motion.div variants={itemVariants}>
          {canViewPatientBalances && (
            <Tabs
              defaultValue={"balances"}
              dir="rtl"
              className="text-black dark:text-white my-2"
            >
              <TabsList className="h-auto w-full gap-2">
                {canViewPatientBalances && (
                  <TabsTrigger
                    value="balances"
                    className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    مدفوعات المريض
                  </TabsTrigger>
                )}
              </TabsList>
              {canViewPatientBalances && (
                <TabsContent value="balances">
                  <PatientBalances patientId={patientId!} />
                </TabsContent>
              )}
            </Tabs>
          )}
        </motion.div>
      </motion.section>
    </>
  );
};

export default PatientDetails;
