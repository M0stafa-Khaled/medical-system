import Query_Keys from "@/enums/queryKeys";
import { getDoctorBookings } from "@/services/doctor/doctorBookings";
import { useQuery } from "@tanstack/react-query";

export const useGetDoctorBookings = ({
  token,
  clinicId,
}: {
  token: string;
  clinicId: number;
}) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_BOOKINGS, clinicId],
    queryFn: () => getDoctorBookings({ token, clinicId }),
  });
