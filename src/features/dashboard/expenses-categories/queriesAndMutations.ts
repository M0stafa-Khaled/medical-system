import { IGetWithParams } from "@/shared/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "@/shared/enums/queryKeys";
import {
  createExpenseCategory,
  deleteExpenseCategory,
  getAllExpenseCategories,
  updateExpenseCategory,
  getAllExpenseCategoryById,
} from "@/features/dashboard/expenses-categories/api";

export const useGetAllExpensesCategories = ({ search }: IGetWithParams) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES, search],
    queryFn: () => getAllExpenseCategories({ search }),
  });

export const useGetAllExpensesCategoryById = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [Query_Keys.GET_ONE_EXPENSES_CATEGORY, id],
    queryFn: () => getAllExpenseCategoryById({ id }),
    enabled: !!id,
  });

export const useCreateExpenseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name }: { name: string }) => createExpenseCategory({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES],
      });
    },
  });
};

export const useUpdateExpenseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, id }: { name: string; id: string }) =>
      updateExpenseCategory({ name, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_EXPENSES_CATEGORY],
      });
    },
  });
};

export const useDeleteExpenseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteExpenseCategory({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ONE_EXPENSES_CATEGORY],
      });
    },
  });
};
