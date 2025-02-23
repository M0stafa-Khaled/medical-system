import { useGetDoctorById } from "@/lib/react-query/doctors";
import cookieServices from "@/utils/cookieServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import formatDateTime from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import DeleteDoctorButton from "@/components/dashboard/doctors/DeleteDoctorModalButton";
import { FaPencil } from "react-icons/fa6";
import ImageModal from "@/components/shared/ImageModal";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import InfoField from "@/components/dashboard/InfoField";
import Actions from "@/components/dashboard/doctors/actions/Actions";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const token = cookieServices.getToken();

  const { doctorId } = useParams();

  const {
    data: doctor,
    isLoading,
    isError,
  } = useGetDoctorById({
    id: doctorId as string,
    token: token as string,
  });

  useEffect(() => {
    if (isError) {
      toast.error("فشل في تحميل بيانات الطبيب");
      navigate("/dashboard/doctors");
      return;
    }
  }, [isError, navigate, doctorId]);

  if (isLoading)
    return (
      <div className="mt-20 text-black dark:text-white flex justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

  if (!doctor?.status && doctor?.message) {
    toast.error(doctor.message);
    navigate("/dashboard/doctors");
    return null;
  }

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
    <section>
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
        <CardHeader>
          <ProfileHeader
            image={image as string}
            name={name as string}
            role={user?.role.toLowerCase() as string}
            actionButtons={
              <>
                <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                  <Link
                    to={`/dashboard/doctors/update/${id}`}
                    className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                  >
                    <FaPencil size={18} />
                  </Link>
                </Button>
                <DeleteDoctorButton id={id as number} name={name as string} />
              </>
            }
          />
        </CardHeader>
        <div className="px-4">
          <Separator className="w-2/6 bg-muted mx-auto sm:mx-0" />
        </div>
        <CardContent className="py-4">
          <CardTitle className="mb-4">المعلومات الأساسية:</CardTitle>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-sm text-muted-foreground">العيادات:</h3>
            <div className="flex items-center flex-wrap gap-2">
              {clinics?.map((clinic) => (
                <Badge key={clinic.id}>{clinic.name}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoField
              label="حالة الحساب"
              value={status ? "مفعل" : "غير مفعل"}
            />
            <InfoField label="العمولة" value={commission!} />
            <InfoField label="رقم القيد" value={register_id!} />
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
              value={formatDateTime(created_at as string)}
              sm
            />
            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </CardContent>
      </Card>
      <Actions doctorId={doctorId!} />
    </section>
  );
};

export default DoctorDetails;
