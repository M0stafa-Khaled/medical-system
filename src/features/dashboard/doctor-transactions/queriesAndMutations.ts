import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoctorTransaction, getDoctorTransactions } from "./api";
import Query_Keys from "@/shared/enums/queryKeys";

export const useGetDoctorTransactions = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TRANSACTIONS, id],
    queryFn: () => getDoctorTransactions({ id }),
    enabled: !!id,
  });

export const useCreateDoctorTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => createDoctorTransaction({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.DOCTOR_TRANSACTIONS],
      });
    },
  });
};
