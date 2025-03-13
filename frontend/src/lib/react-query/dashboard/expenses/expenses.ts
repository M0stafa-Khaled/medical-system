import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../../queryKeys";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  cancelExpense,
} from "@/services/dashboard/expenses/expenses";
import { IGetWithParams } from "@/interfaces";
import { ICreateExpense } from "@/interfaces/dashboard/expenses/expense";

export const useGetAllExpenses = ({ token, page, search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EXPENSES, page, search],
    queryFn: () => getAllExpenses({ token, page, search }),
  });

export const useGetExpenseById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_EXPENSE, id],
    queryFn: () => getExpenseById({ token, id }),
    enabled: !!id,
  });

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      dataForm,
    }: {
      token: string;
      dataForm: ICreateExpense;
    }) => createExpense({ token, dataForm }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES],
      });
    },
  });
};
export const useCancelExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      id,
      cancelled_info,
    }: {
      token: string;
      id: string;
      cancelled_info: string;
    }) => cancelExpense({ token, id, cancelled_info }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES],
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deleteExpense({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES],
      });
    },
  });
};
