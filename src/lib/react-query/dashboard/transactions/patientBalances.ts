import Query_Keys from "@/enums/queryKeys";
import { ICreatePatientPayment } from "@/interfaces/patientBalances";
import {
  createPatientPayment,
  getPatientBalances,
} from "@/services/dashboard/transactions/patientBalances";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPatientBalances = ({
  patientId,
  token,
}: {
  token: string;
  patientId: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TRANSACTION_PATIENT_BALANCES],
    queryFn: () => getPatientBalances({ token, patientId }),
    enabled: !!patientId,
  });

export const useCreatePatientPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, patientId, transaction }: ICreatePatientPayment) =>
      createPatientPayment({ token, patientId, transaction }),
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
