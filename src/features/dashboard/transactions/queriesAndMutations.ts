import Query_Keys from "@/shared/enums/queryKeys";
import { IGetWithParams } from "@/shared/types";
import { ICreateTransaction, IRefundTransaction } from "./types";
import {
  createTransaction,
  getAllTransactions,
  getPatientLastVisits,
  getTransactionById,
  refundTransaction,
  getAllPatientBalancesTransactions,
} from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllTransactions = ({ filter, page, sort }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_TRANSACTIONS, filter, page, sort],
    queryFn: () => getAllTransactions({ filter, page, sort }),
  });

export const useGetTransactionById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_TRANSACTION, id],
    queryFn: () => getTransactionById({ id }),
    enabled: !!id,
  });

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateTransaction) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_BOOKINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_LAST_VISITS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_TRANSACTIONS_BALANCES],
      });
    },
  });
};

export const useRefundTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, refund_info }: IRefundTransaction) =>
      refundTransaction({ id, refund_info }),
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
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_LAST_VISITS],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_PATIENT_TRANSACTIONS_BALANCES],
      });
    },
  });
};

export const useGetPatientLastVisits = ({
  doctorId,
  patientId,
}: {
  doctorId: string;
  patientId: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_PATIENT_LAST_VISITS],
    queryFn: () => getPatientLastVisits({ doctorId, patientId }),
    enabled: !!doctorId && !!patientId,
  });

export const useGetAllPatientTransactionsBalances = ({
  search,
  patientId,
}: {
  search: string;
  patientId: string;
}) =>
  useQuery({
    queryKey: [
      Query_Keys.GET_ALL_PATIENT_TRANSACTIONS_BALANCES,
      search,
      patientId,
    ],
    queryFn: () => getAllPatientBalancesTransactions({ search, patientId }),
    enabled: !!patientId,
  });
