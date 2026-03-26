import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plus } from "lucide-react";
import {
  useDeletePatientBooking,
  useGetAllPatientBookings,
  useUpdatePatientBooking,
} from "../queriesAndMutations";
import { PatientBookingsList } from "../components/PatientBookingsList";
import { handleResErr } from "@/shared/utils/handleResError";

const PatientBookings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useGetAllPatientBookings({ page });
  const { mutateAsync: updateBooking, isPending: isUpdating } =
    useUpdatePatientBooking();
  const { mutateAsync: deleteBooking, isPending: isDeleting } =
    useDeletePatientBooking();

  const items = useMemo(() => data?.data?.items || [], [data]);

  const handleCancel = async (id: string) => {
    try {
      const target = items.find((item) => item.id.toString() === id);

      if (!target) {
        const deleteRes = await deleteBooking({ id });
        if (!deleteRes.status) {
          toast.error(deleteRes.message || "فشل في إلغاء الحجز");
          return;
        }
        toast.success(deleteRes.message || "تم إلغاء الحجز بنجاح");
        return;
      }

      const res = await updateBooking({
        id,
        clinic_id: target.clinic.id.toString(),
        doctor_id: target.doctor.id.toString(),
        working_day_id: target.working_day.id.toString(),
        doctor_action_id: target.action.id.toString(),
        date: target.booking_date,
        start_at: target.start_at,
      });

      if (!res.status) {
        toast.error(res.message || "فشل في تحديث حالة الحجز");
        return;
      }

      const deleteRes = await deleteBooking({ id });
      if (!deleteRes.status) {
        toast.error(deleteRes.message || "فشل في إلغاء الحجز");
        return;
      }

      toast.success(deleteRes.message || "تم إلغاء الحجز بنجاح");
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <section className="space-y-5">
      <Card className="overflow-hidden border-0 bg-linear-to-r from-cyan-500/10 via-emerald-500/10 to-lime-500/10">
        <CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl">الحجوزات</CardTitle>
          <Button
            onClick={() => navigate("/patient/bookings/create")}
            className="bg-primary text-primary-foreground w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            حجز جديد
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-2xl text-sm">
            أدِر مواعيدك القادمة، عدّل تفاصيل الحجز، وقم بإلغاء الحجوزات قيد
            الانتظار.
          </p>
        </CardContent>
      </Card>

      <PatientBookingsList
        data={items}
        meta={data?.data?.meta}
        currentPage={page}
        isLoading={isLoading}
        onCancel={handleCancel}
        isCancelling={isUpdating || isDeleting}
      />
    </section>
  );
};

export default PatientBookings;
