import { useQuery } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import { getAllMedications } from "@/services/dashboard/medications";
import { IGetTokenPageSearch } from "@/interfaces";

export const useGetALlMedications = ({
  token,
  page,
  search,
}: IGetTokenPageSearch) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_MEDICATIONS, page, search],
    queryFn: () => getAllMedications({ token, page, search }),
    staleTime: 30 * 1000,
  });
