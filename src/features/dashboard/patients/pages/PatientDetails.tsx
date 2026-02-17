import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import formatDateTime from "@/shared/utils/formatDate";
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
import HeaderUserDetails from "@/components/shared/HeaderUserDetails";
import InfoField from "@/components/shared/InfoField";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { Calendar, BadgeCheck, BadgeX } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { AxiosResErr } from "@/shared/types";
import { useDeletePatient, useGetPatientById } from "../queriesAndMutations";
import { DeleteAlert } from "@/components/shared/delete-alert";
import { PatientBalances } from "../balances/components/PatientBalances";

const PatientDetails = () => {
  const canUpdatePatient = useHasPermission(PERMISSIONS.UPDATE_PATIENT);
  const canDeletePatient = useHasPermission(PERMISSIONS.DELETE_PATIENT);

  const canViewPatientBalances = useHasPermission(PERMISSIONS.PATIENT_BALANCES);

  const navigate = useNavigate();
  const { patientId } = useParams();

  const {
    data: patient,
    isLoading,
    isError,
    failureReason,
  } = useGetPatientById({
    id: patientId!,
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

  const { mutateAsync: deletePatient } = useDeletePatient();

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
        <Card className="border-muted mt-5">
          <CardHeader className="py-4">
            <motion.div variants={itemVariants}>
              <HeaderUserDetails
                name={name!}
                role={user?.role.toLowerCase() as string}
                actionButtons={
                  <>
                    {canUpdatePatient && (
                      <motion.div variants={itemVariants}>
                        <Button className="btn-edit rounded-full" size={"icon"}>
                          <Link to={`/dashboard/patients/${id}/update`}>
                            <Pen />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                    {canDeletePatient && (
                      <motion.div variants={itemVariants}>
                        <DeleteAlert
                          name={name!}
                          deleteAction={() => deletePatient({ id: id! })}
                        />
                      </motion.div>
                    )}
                  </>
                }
              />
            </motion.div>
          </CardHeader>
          <motion.div variants={itemVariants} className="px-4">
            <Separator className="bg-muted mx-auto w-2/6 sm:mx-0" />
          </motion.div>
          <CardContent className="py-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>
            </motion.div>

            <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div variants={itemVariants}>
                <InfoField
                  icon={
                    status ? (
                      <BadgeCheck className="text-green-500" size={20} />
                    ) : (
                      <BadgeX className="text-red-500" size={20} />
                    )
                  }
                  label="حالة الحساب"
                  value={status ? "نشط" : "غير نشط"}
                />
              </motion.div>

              <InfoField
                icon={<Info className="text-blue-700" size={20} />}
                label="ملاحظات حالة الحساب"
                value={info_status!}
              />

              <InfoField
                icon={<Users className="text-blue-700" size={20} />}
                label="اسم احد الاقارب"
                value={another_name!}
                breakAll
              />

              <InfoField
                icon={<BadgeInfo className="text-primary" size={20} />}
                label="ملاحظات"
                value={description!}
              />

              <InfoField
                icon={<UserCircle2 className="text-primary" size={20} />}
                label="رقم الهوية"
                value={personal_id!}
              />

              <InfoField
                icon={<Phone className="text-green-600" size={20} />}
                label="رقم الهاتف الاول"
                value={first_phone!}
              />

              <InfoField
                icon={<Phone className="text-purple-600" size={20} />}
                label="رقم الهاتف الثاني"
                value={second_phone ? second_phone : "لا يوجد"}
              />

              <InfoField
                icon={<Mail className="text-orange-500" size={20} />}
                label="البريد الإلكتروني"
                value={user?.email as string}
                sm
                breakAll
              />

              <InfoField
                label="الجنس"
                value={gender?.toLowerCase() === "male" ? "ذكر" : "انثى"}
                sm
                icon={<VenusAndMars className="text-primary" size={20} />}
              />

              <InfoField
                icon={<Calendar className="text-teal-500" size={20} />}
                label="تاريخ الإنشاء"
                value={formatDateTime(created_at!)}
                sm
              />

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 select-none"
              >
                <FileImage className="text-cyan-500" size={20} />
                <h5 className="text-muted-foreground text-sm">صورة الهوية :</h5>
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
              className="my-2 text-black dark:text-white"
            >
              <TabsList className="h-auto w-full gap-2">
                {canViewPatientBalances && (
                  <TabsTrigger
                    value="balances"
                    className="dark:text-muted-foreground w-full py-2.5 text-base font-medium text-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
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
