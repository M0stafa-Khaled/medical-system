import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
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
import { Separator } from "@/shared/components/ui/separator";
import formatDateTime from "@/shared/utils/formatDate";
import { Badge } from "@/shared/components/ui/badge";
import ImageModal from "@/components/shared/ImageModal";
import HeaderUserDetails from "@/components/shared/HeaderUserDetails";
import InfoField from "@/components/shared/InfoField";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/shared/components/ui/DataLoader";
import { Helmet } from "react-helmet-async";
import { useDeleteDoctor, useGetDoctorById } from "../queriesAndMutations";

import { TooltipButton } from "@/shared/components/ui/TooltipButton";
import { AxiosResErr } from "@/shared/types";
import { DoctorTabs } from "../components/DoctorTabs";
import { DeleteAlert } from "@/components/shared/delete-alert";

const DoctorDetails = () => {
  const canUpdateDoctor = useHasPermission(PERMISSIONS.UPDATE_DOCTOR);
  const canDeleteDoctor = useHasPermission(PERMISSIONS.DELETE_DOCTOR);

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

  const { mutateAsync: deleteDoctor } = useDeleteDoctor();

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الطبيب");
      navigate("/dashboard/doctors");
      return;
    }
  }, [isError, navigate]);

  const doctorsFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || doctorsFailure?.response?.data.message) {
      toast.error(
        doctorsFailure.response?.data.message || "فشل في تحميل بيانات الطبيب"
      );
      navigate("/dashboard/doctors");
      return;
    }
  }, [isError, navigate, doctorsFailure]);

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
        <Card className="border-muted mt-5">
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
                          <Button
                            asChild
                            className="btn-edit rounded-full"
                            size={"icon"}
                          >
                            <Link to={`/dashboard/doctors/${id}/update`}>
                              <Pen size={20} />
                            </Link>
                          </Button>
                        </TooltipButton>
                      </motion.div>
                    )}
                    {canDeleteDoctor && (
                      <motion.div variants={itemVariants}>
                        <DeleteAlert
                          deleteAction={() => deleteDoctor({ id: id! })}
                          name={name!}
                          navigatePath="/dashboard/doctors"
                        />
                      </motion.div>
                    )}
                  </>
                }
              />
            </motion.div>
          </CardHeader>
          <motion.div className="px-4" variants={itemVariants}>
            <Separator className="bg-muted mx-auto w-2/6 sm:mx-0" />
          </motion.div>
          <CardContent className="py-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <motion.div
                className="col-span-full flex items-center gap-2"
                variants={itemVariants}
              >
                <Building2 className="text-blue-700" />
                <h3 className="text-muted-foreground text-sm">العيادات:</h3>
                <div className="flex flex-wrap items-center gap-2">
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
                <h5 className="text-muted-foreground text-sm">التوقيع:</h5>
                {signature ? (
                  <ImageModal
                    src={signature}
                    alt="Signature"
                    showThumbnail={false}
                    trigger={<Button size="sm">عرض الصورة</Button>}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">لا يوجد</p>
                )}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
        {/* Tabs */}
        <DoctorTabs doctorId={id?.toString() || ""} />
      </motion.section>
    </>
  );
};

export default DoctorDetails;
