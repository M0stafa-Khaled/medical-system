import { useQuery } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";
import { getAllDrugs } from "@/services/dashboard/drugs";
import { IGetWithParams } from "@/interfaces";

export const useGetALlDrugs = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_MEDICATIONS, page, search],
    queryFn: () => getAllDrugs({ token, page, search }),
    staleTime: 30 * 1000,
  });
