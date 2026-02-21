import Query_Keys from "@/shared/enums/queryKeys";
import { createPatientPayment, getPatientBalances } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreatePatientPayment } from "./types";

export const useGetPatientBalances = ({ patientId }: { patientId: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TRANSACTION_PATIENT_BALANCES],
    queryFn: () => getPatientBalances({ patientId }),
    enabled: !!patientId,
  });

export const useCreatePatientPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ patientId, transaction }: ICreatePatientPayment) =>
      createPatientPayment({ patientId, transaction }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TRANSACTION_PATIENT_BALANCES],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_LAST_VISITS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TRANSACTIONS],
      });
    },
  });
};
