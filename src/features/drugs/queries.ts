import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getAllDrugs } from "./api";

export const useGetALlDrugs = ({ page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_DRUGS, page, search],
    queryFn: () => getAllDrugs({ page, search }),
  });
