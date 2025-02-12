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
import DeleteDoctorButton from "@/components/dashboard/doctors/DeleteClinicModalButton";
import { FaPencil } from "react-icons/fa6";

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
    status,
    user,
  } = doctor?.data || {};

  return (
    <section>
      <Card className="bg-foreground/50 dark:bg-foreground border-muted dark:border-muted shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-x-6 gap-y-3 pb-2">
            <div className="w-36 h-36">
              <img
                src={image || "/avatar.svg"}
                alt={name}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="space-y-1">
              <div>
                <h3 className="flex items-center gap-2">{doctor?.data.name}</h3>
                <p className="capitalize text-muted-foreground text-center sm:text-start">
                  {user?.role}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 my-2">
                  <Button className="h-auto py-0 px-0 bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm">
                    <Link
                      to={`/dashboard/doctors/update/${id}`}
                      className="flex justify-center items-center gap-2 py-1 px-1 w-9 h-9"
                    >
                      <FaPencil size={18} />
                    </Link>
                  </Button>
                  <DeleteDoctorButton id={id as number} name={name as string} />
                </div>
              </div>
            </div>
          </div>
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
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">الحالة:</h5>
              <p className="font-medium">{status ? "متاح" : "غير متاح"}</p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">العمولة:</h5>
              <p className="font-medium">{commission}</p>
            </div>

            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">رقم القيد:</h5>
              <p className="font-medium break-all">{register_id}</p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">رقم الهوية:</h5>
              <p className="font-medium break-all">{personal_id}</p>
            </div>

            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">
                رقم الهاتف الاول:
              </h5>
              <p className="font-medium break-all">{first_phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">
                رقم الهاتف الثاني:
              </h5>
              <p className="font-medium break-words whitespace-pre-wrap">
                {second_phone ? second_phone : "لا يوجد"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">
                البريد الإلكتروني:
              </h5>
              <p className="font-medium text-sm text-wrap break-all">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground">تاريخ الإنشاء:</h5>
              <p className="font-medium text-sm">
                {formatDateTime(created_at as string)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm text-muted-foreground"> التوقيع:</h5>
              {signature ? (
                <img
                  src={signature}
                  alt={`signature of ${name}`}
                  className="w-36 rounded-md"
                />
              ) : (
                <p className="font-medium">لا يوجد</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DoctorDetails;
