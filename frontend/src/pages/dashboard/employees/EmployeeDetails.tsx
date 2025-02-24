import { useGetEmployeeById } from "@/lib/react-query/employees";
import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import ImageModal from "@/components/shared/ImageModal";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import InfoField from "@/components/dashboard/InfoField";
import { FaPencil } from "react-icons/fa6";
import DeleteEmployeeButton from "@/components/dashboard/employees/DeleteEmployeeModalButton";
import useHasPermission from "@/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

const EmployeeDetails = () => {
  const canEditEmployee = useHasPermission(PERMISSIONS.EDIT_EMPLOYEE);
  const canDeleteEmployee = useHasPermission(PERMISSIONS.DELETE_EMPLOYEE);
  const navigate = useNavigate();
  const token = cookieServices.getToken();
  const { employeeId } = useParams();

  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeById({
    id: employeeId!,
    token: token!,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الموظف");
      navigate("/dashboard/employees");
      return;
    }

    if (!employee?.status && employee?.message) {
      toast.error(employee.message);
      navigate("/dashboard/employees");
      return;
    }
  }, [employee, isError, navigate]);

  if (isLoading)
    return (
      <div className="mt-20 text-black dark:text-white flex justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

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
  } = employee?.data || {};

  return (
    <section>
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
        <CardHeader>
          <ProfileHeader
            image={image!}
            name={name!}
            role={user?.role.toLowerCase() as string}
            actionButtons={
              <>
                {canEditEmployee && (
                  <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                    <Link
                      to={`/dashboard/employees/update/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                    >
                      <FaPencil size={18} />
                    </Link>
                  </Button>
                )}
                {canDeleteEmployee && (
                  <DeleteEmployeeButton id={id!} name={name!} />
                )}
              </>
            }
          />
        </CardHeader>
        <div className="px-4">
          <Separator className="w-2/6 bg-muted mx-auto sm:mx-0" />
        </div>
        <CardContent className="py-4">
          <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoField
              label="حالة الحساب"
              value={status ? "مفعل" : "غير مفعل"}
            />
            <InfoField label="الراتب" value={salary!} />
            <InfoField label="الوظيفة" value={job!} />
            <InfoField label="رقم الهوية" value={personal_id!} />
            <InfoField label="رقم الهاتف الاول" value={first_phone!} />
            <InfoField
              label="رقم الهاتف الثاني"
              value={second_phone ? second_phone : "لا يوجد"}
            />
            <InfoField
              label="البريد الإلكتروني"
              value={user?.email as string}
              sm
            />
            <InfoField
              label="الجنس"
              value={gender?.toLowerCase() === "male" ? "ذكر" : "انثى"}
              sm
            />
            <InfoField
              label="تاريخ الإنشاء"
              value={formatDateTime(created_at!)}
              sm
            />
            <div className="flex items-center gap-2 select-none">
              <h5 className="text-sm text-muted-foreground">صورة الهوية :</h5>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmployeeDetails;
