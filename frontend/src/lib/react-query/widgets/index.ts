import Query_Keys from "@/enums/queryKeys";
import { getAdminWidgets, getDoctorWidgets } from "@/services/widgets";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminWidgets = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.ADMIN_WIDGETS],
    queryFn: () => getAdminWidgets(token),
  });

export const useGetDoctorWidgets = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_WIDGETS],
    queryFn: () => getDoctorWidgets(token),
  });
