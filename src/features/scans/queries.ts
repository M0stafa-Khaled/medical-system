import { IGetWithParams } from "@/shared/types";
import { getAllScans } from "./api";
import { useQuery } from "@tanstack/react-query";
import Query_Keys from "@/enums/queryKeys";

export const useGetAllScans = ({ page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_SCANS, page, search],
    queryFn: () => getAllScans({ page, search }),
  });
