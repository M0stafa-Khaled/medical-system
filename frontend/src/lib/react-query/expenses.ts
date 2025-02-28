import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "./queryKeys";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  CancelExpense,
} from "@/api/expenses";
import { IGetTokenPageSearch } from "@/interfaces";
import { ICreateExpense } from "@/interfaces/expense";

export const useGetAllExpenses = ({
  token,
  page,
  search,
}: IGetTokenPageSearch) =>
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

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      id,
      dataForm,
    }: {
      token: string;
      id: string;
      dataForm: ICreateExpense;
    }) => CancelExpense({ token, dataForm, id }),
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
