import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getAllAnalysis } from "./api";

export const useGetAllAnalysis = ({ page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_ANALYSIS, page, search],
    queryFn: () => getAllAnalysis({ page, search }),
  });
