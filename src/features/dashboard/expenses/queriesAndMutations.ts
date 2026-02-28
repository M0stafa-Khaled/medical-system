import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  cancelExpense,
} from "./api";
import { IGetWithParams } from "@/shared/types";
import { ICreateExpense } from "@/features/dashboard/expenses/types";

export const useGetAllExpenses = ({ page, sort, filter }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EXPENSES, page, sort, filter],
    queryFn: () => getAllExpenses({ page, sort, filter }),
  });

export const useGetExpenseById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_EXPENSE, id],
    queryFn: () => getExpenseById({ id }),
    enabled: !!id,
  });

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dataForm }: { dataForm: ICreateExpense }) =>
      createExpense({ dataForm }),
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
      id,
      cancelled_info,
    }: {
      id: string;
      cancelled_info: string;
    }) => cancelExpense({ id, cancelled_info }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_EXPENSE],
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteExpense({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_EXPENSE],
      });
    },
  });
};
