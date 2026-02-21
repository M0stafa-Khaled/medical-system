import Query_Keys from "@/shared/enums/queryKeys";
import { getPatientTransactionsBalances } from "@/services/patient/patientBalances";
import { useQuery } from "@tanstack/react-query";

export const useGetPatientTransactionsBalances = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENT_BALANCES],
    queryFn: () => getPatientTransactionsBalances(token),
  });
