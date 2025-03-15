import { useQuery } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import { getAllMedications } from "@/services/dashboard/drugs";
import { IGetWithParams } from "@/interfaces";

export const useGetALlMedications = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_MEDICATIONS, page, search],
    queryFn: () => getAllMedications({ token, page, search }),
    staleTime: 30 * 1000,
  });
