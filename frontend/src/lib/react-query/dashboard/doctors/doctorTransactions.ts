import Query_Keys from "@/enums/queryKeys";
import {
  createDoctorTransaction,
  getDoctorTransactions,
} from "@/services/dashboard/doctors/doctorTransactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDoctorTransactions = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.DOCTOR_TRANSACTIONS, id],
    queryFn: () => getDoctorTransactions({ token, id }),
    enabled: !!id,
  });

export const useCreateDoctorTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      createDoctorTransaction({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.DOCTOR_TRANSACTIONS],
      });
    },
  });
};
