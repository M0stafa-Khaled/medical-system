import DataLoader from "@/shared/components/ui/DataLoader";
import { AlertTriangle } from "lucide-react";
import { useParams } from "react-router";
import { PatientBookingForm } from "../components/PatientBookingForm";
import { useGetPatientBookingById } from "../queriesAndMutations";

const UpdatePatientBooking = () => {
  const { bookingId = "" } = useParams();
  const { data, isLoading, isError } = useGetPatientBookingById({
    id: bookingId,
  });

  if (isLoading) return <DataLoader />;

  if (isError || !data?.data) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 rounded-xl border p-4">
        <AlertTriangle size={18} />
        تعذر تحميل تفاصيل الحجز.
      </div>
    );
  }

  return <PatientBookingForm mode="update" booking={data.data} />;
};

export default UpdatePatientBooking;
