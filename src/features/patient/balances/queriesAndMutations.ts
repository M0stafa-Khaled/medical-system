import { useQuery } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import { getPatientBalances } from "./api";

export const useGetPatientBalances = () =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENT_BALANCES],
    queryFn: () => getPatientBalances(),
  });
