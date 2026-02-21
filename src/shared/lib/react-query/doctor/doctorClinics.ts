import Query_Keys from "@/shared/enums/queryKeys";
import { getDoctorClinics } from "@/services/doctor/doctorClinics";
import { useQuery } from "@tanstack/react-query";

export const useGetDoctorClinics = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_CLINICS],
    queryFn: () => getDoctorClinics(token),
  });
