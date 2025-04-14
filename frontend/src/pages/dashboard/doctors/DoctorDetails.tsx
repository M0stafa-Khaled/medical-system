import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  BadgeX,
  Calendar,
  FileImage,
  Mail,
  Phone,
  UserCircle2,
  VenusAndMars,
  BadgeInfo,
  Building2,
  Percent,
  Pen,
} from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import DeleteDoctor from "@/components/dashboard/doctors/DeleteDoctor";
import ImageModal from "@/components/shared/ImageModal";
import HeaderUserDetails from "@/components/dashboard/HeaderUserDetails";
import InfoField from "@/components/dashboard/InfoField";
import Actions from "@/components/dashboard/doctors/actions/Actions";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useGetDoctorById } from "@/lib/react-query/dashboard/doctors/doctors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkingDays from "@/components/dashboard/doctors/workingDays/WorkingDays";
import TooltipButton from "@/components/ui/TooltipButton";

const DoctorDetails = () => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);
  const canViewDoctorActions = useHasPermission(PERMISSIONS.DOCTOR_ACTIONS);
  const canViewDoctorWorkingDays = useHasPermission(PERMISSIONS.WORKING_DAYS);

  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { doctorId } = useParams();
  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorById({
    id: doctorId!,
    token,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الطبيب");
      navigate("/dashboard/doctors");
      return;
    }
    if (doctor?.message) {
      toast.error(doctor.message);
      navigate("/dashboard/doctors");
      return;
    }
  }, [isError, navigate, doctor?.message]);

  if (isLoading) return <DataLoader />;

  const {
    id,
    clinics,
    commission,
    created_at,
    first_phone,
    image,
    name,
    personal_id,
    register_id,
    second_phone,
    signature,
    gender,
    status,
    user,
  } = doctor?.data || {};

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_WEB_NAME} | د / {name || " "}
        </title>
      </Helmet>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
          <CardHeader className="py-4">
            <motion.div variants={itemVariants}>
              <HeaderUserDetails
                image={image!}
                name={name!}
                role={user?.role.toLowerCase() as string}
                actionButtons={
                  <>
                    {canUpdateDoctor && (
                      <motion.div variants={itemVariants}>
                        <TooltipButton title="تعديل">
                          <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                            <Link
                              to={`/dashboard/doctors/${id}/update`}
                              className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                            >
                              <Pen size={20} />
                            </Link>
                          </Button>
                        </TooltipButton>
                      </motion.div>
                    )}
                    {canDeleteDoctor && (
                      <motion.div variants={itemVariants}>
                        <DeleteDoctor id={id!} name={name!} />
                      </motion.div>
                    )}
                  </>
                }
              />
            </motion.div>
          </CardHeader>
          <motion.div className="px-4" variants={itemVariants}>
            <Separator className="w-2/6 bg-muted mx-auto sm:mx-0" />
          </motion.div>
          <CardContent className="py-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <motion.div
                className="flex items-center gap-2 col-span-full"
                variants={itemVariants}
              >
                <Building2 className="text-blue-700" />
                <h3 className="text-sm text-muted-foreground">العيادات:</h3>
                <div className="flex items-center flex-wrap gap-2">
                  {clinics?.map((clinic) => (
                    <motion.div key={clinic.id} variants={itemVariants}>
                      <Badge>{clinic.name}</Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

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
                  icon={<Percent className="text-orange-500" />}
                  label="العمولة"
                  value={commission!}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<BadgeInfo className="text-blue-700" />}
                  label="رقم القيد"
                  value={register_id!}
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
                  icon={<VenusAndMars className="text-primary" />}
                  label="الجنس"
                  value={gender?.toLowerCase() === "male" ? "ذكر" : "انثى"}
                  sm
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  icon={<Calendar className="text-teal-500" />}
                  label="تاريخ الإنشاء"
                  value={formatDateTime(created_at as string)}
                  sm
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <FileImage className="text-cyan-500" />
                <h5 className="text-sm text-muted-foreground">التوقيع:</h5>
                {signature ? (
                  <ImageModal
                    src={signature}
                    alt="Signature"
                    showThumbnail={false}
                    trigger={<Button size="sm">عرض الصورة</Button>}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">لا يوجد</p>
                )}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
        <motion.div variants={itemVariants}>
          {(canViewDoctorActions || canViewDoctorWorkingDays) && (
            <Tabs
              defaultValue={canViewDoctorActions ? "actions" : "working-days"}
              dir="rtl"
              className="text-black dark:text-white my-2"
            >
              <TabsList className="h-auto w-full gap-2">
                {canViewDoctorActions && (
                  <TabsTrigger
                    value="actions"
                    className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    الإجراءات
                  </TabsTrigger>
                )}
                {canViewDoctorWorkingDays && (
                  <TabsTrigger
                    value="working-days"
                    className="w-full py-2.5 font-medium text-base text-slate-700 dark:text-muted-foreground data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    ايام العمل
                  </TabsTrigger>
                )}
              </TabsList>
              {canViewDoctorActions && (
                <TabsContent value="actions">
                  <Actions doctorId={doctorId!} />
                </TabsContent>
              )}
              {canViewDoctorWorkingDays && (
                <TabsContent value="working-days">
                  <WorkingDays doctorId={doctorId!} />
                </TabsContent>
              )}
            </Tabs>
          )}
        </motion.div>
      </motion.section>
    </>
  );
};

export default DoctorDetails;
