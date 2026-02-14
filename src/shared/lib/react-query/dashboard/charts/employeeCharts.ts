import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { getEmployeeTreasuriesChart } from "@/services/dashboard/charts/employeeCharts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetEmployeeTreasuriesChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.EMPLOYEE_TREASURIES_CHART, filter],
    queryFn: () => getEmployeeTreasuriesChart({ token, filter }),
    placeholderData: keepPreviousData,
  });
