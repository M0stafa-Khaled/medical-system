import Query_Keys from "@/enums/queryKeys";
import { IGetWithParams } from "@/interfaces";
import {
  ICreateTransaction,
  IRefundTransaction,
} from "@/interfaces/dashboard/transactions";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  refundTransaction,
} from "@/services/dashboard/transactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllTransactions = ({
  token,
  filter,
  page,
  sort,
}: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TRANSACTIONS, filter, page, sort],
    queryFn: () => getAllTransactions({ token, filter, page, sort }),
  });

export const useGetTransactionById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_TRANSACTION, id],
    queryFn: () => getTransactionById({ token, id }),
  });

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, formData }: ICreateTransaction) =>
      createTransaction({ token, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_TRANSACTION],
      });
    },
  });
};

export const useRefundTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token, refund_info }: IRefundTransaction) =>
      refundTransaction({ id, token, refund_info }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_TRANSACTION],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
    },
  });
};
