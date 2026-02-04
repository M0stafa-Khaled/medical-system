import Query_Keys from "@/enums/queryKeys";
import { getAdminWidgets } from "@/services/dashboard/widgets";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAdminWidgets = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.ADMIN_WIDGETS],
    queryFn: () => getAdminWidgets(token),
    placeholderData: keepPreviousData
  });
