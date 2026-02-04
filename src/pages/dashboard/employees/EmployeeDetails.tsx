import { useGetEmployeeById } from "@/lib/react-query/dashboard/employees";
import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import {
  BadgeCheck,
  BadgeX,
  Briefcase,
  Calendar,
  CircleDollarSign,
  FileImage,
  Mail,
  Pen,
  Phone,
  ShieldUser,
  UserCircle2,
  VenusAndMars,
  Wallet,
} from "lucide-react";
import ImageModal from "@/components/shared/ImageModal";
import HeaderUserDetails from "@/components/shared/HeaderUserDetails";
import InfoField from "@/components/shared/InfoField";
import DeleteEmployee from "@/components/dashboard/employees/DeleteEmployee";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations";
import DataLoader from "@/components/ui/DataLoader";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import TooltipButton from "@/components/ui/TooltipButton";
import { AxiosResErr } from "@/types";

const EmployeeDetails = () => {
  const canUpdateEmployee = useHasPermission(PERMISSIONS.UPDATE_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const navigate = useNavigate();
  const token = cookieServices.getToken()!;
  const { employeeId } = useParams();

  const {
    data: employee,
    isLoading,
    isError,
    failureReason,
  } = useGetEmployeeById({
    id: employeeId!,
    token,
  });

  const employeeFailure = failureReason as AxiosResErr;

  useEffect(() => {
    if (isError || employeeFailure?.response?.data.message) {
      toast.error(
        employeeFailure.response?.data.message || "فشل في تحميل بيانات الموظف"
      );
      navigate(-1);
      return;
    }
  }, [isError, navigate, employeeFailure]);

  if (isLoading) return <DataLoader />;

  const {
    id,
    first_phone,
    second_phone,
    name,
    image,
    job,
    salary,
    created_at,
    status,
    personal_id,
    user,
    gender,
    personal_image,
    permissions,
    treasury,
  } = employee?.data || {};

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
        <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-xs">
          <CardHeader className="py-4">
            <motion.div variants={itemVariants}>
              <HeaderUserDetails
                image={image!}
                name={name!}
                role={user?.role.toLowerCase() as string}
                actionButtons={
                  <>
                    {canUpdateEmployee && (
                      <motion.div variants={itemVariants}>
                        <TooltipButton title="تعديل">
                          <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                            <Link
                              to={`/dashboard/employees/${id}/update`}
                              className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                            >
                              <Pen size={20} />
                            </Link>
                          </Button>
                        </TooltipButton>
                      </motion.div>
                    )}
                    {canDeleteEmployee && (
                      <motion.div variants={itemVariants}>
                        <DeleteEmployee id={id!} name={name!} />
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
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <InfoField
                  label="حالة الحساب"
                  value={status ? "نشط" : "غير نشط"}
                  icon={
                    status ? (
                      <BadgeCheck className="text-green-500" />
                    ) : (
                      <BadgeX className="text-red-500" />
                    )
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الراتب"
                  value={salary!}
                  icon={<CircleDollarSign className="text-blue-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الوظيفة"
                  value={job!}
                  icon={<Briefcase className="text-purple-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الخزينة"
                  value={treasury?.name ?? "لا يوجد"}
                  icon={<Wallet className="h-5 w-5 text-yellow-500" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="رقم الهوية"
                  value={personal_id!}
                  icon={<UserCircle2 className="text-primary" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="رقم الهاتف الاول"
                  value={first_phone!}
                  icon={<Phone className="text-green-600" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="رقم الهاتف الثاني"
                  value={second_phone ? second_phone : "لا يوجد"}
                  icon={<Phone className="text-purple-600" />}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="البريد الإلكتروني"
                  value={user?.email as string}
                  icon={<Mail className="text-orange-500" />}
                  sm
                  breakAll
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="الجنس"
                  value={gender?.toLowerCase() === "male" ? "ذكر" : "انثى"}
                  icon={<VenusAndMars className="text-primary" />}
                  sm
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfoField
                  label="تاريخ الإنشاء"
                  value={formatDateTime(created_at!)}
                  icon={<Calendar className="text-teal-500" />}
                  sm
                />
              </motion.div>

              <motion.div
                className="flex items-center gap-2 select-none"
                variants={itemVariants}
              >
                <h5 className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileImage className="text-cyan-500" />
                  صورة الهوية :
                </h5>
                {personal_image ? (
                  <ImageModal
                    src={personal_image}
                    alt="صورة الهوية"
                    showThumbnail={false}
                    trigger={<Button size="sm">عرض الصورة</Button>}
                  />
                ) : (
                  <p>لا يوجد صورة</p>
                )}
              </motion.div>
              {user?.role === "employee" && (
                <motion.div
                  className="flex gap-2 col-span-full"
                  variants={itemVariants}
                >
                  <ShieldUser className="text-blue-700 shrink-0" />
                  <h3 className="text-sm text-muted-foreground">الصلاحيات:</h3>
                  <div className="flex items-center flex-wrap gap-2">
                    {permissions?.map((permission) => (
                      <motion.div key={permission.id} variants={itemVariants}>
                        <Badge>{permission.name}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    </>
  );
};

export default EmployeeDetails;
