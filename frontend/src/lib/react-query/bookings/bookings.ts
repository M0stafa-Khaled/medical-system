import { useQuery } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import { getAllClinicsDoctors } from "@/services/bookings/bookings";

export const useGetAllDoctorsClinics = ({
  token,
  clinic_id,
}: {
  token: string;
  clinic_id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DOCTORS_CLINICS, clinic_id],
    enabled: !!clinic_id,
    queryFn: () => getAllClinicsDoctors({ token, clinic_id }),
  });
