import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import { getEmployeeTreasuriesChart } from "@/services/charts/employeeCharts";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeTreasuriesChart = ({
  token,
  filter,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.EMPLOYEE_TREASURIES_CHART, filter],
    queryFn: () => getEmployeeTreasuriesChart({ token, filter }),
  });
