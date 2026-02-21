import Query_Keys from "@/shared/enums/queryKeys";
import { getDoctorWidgets } from "@/services/doctor/doctorWidgets";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetDoctorWidgets = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_WIDGETS],
    queryFn: () => getDoctorWidgets(token),
    placeholderData: keepPreviousData,
  });
