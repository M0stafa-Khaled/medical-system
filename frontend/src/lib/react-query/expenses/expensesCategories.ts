import { IGetTokenPageSearch } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../queryKeys";
import {
  createExpenseCategory,
  deleteExpenseCategory,
  getAllExpenseCategories,
  updateExpenseCategory,
  getAllExpenseCategoryById,
} from "@/services/dashboard/expenses/expensesCategories";

export const useGetAllExpensesCategories = ({
  token,
  search,
}: IGetTokenPageSearch) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES, search],
    queryFn: () => getAllExpenseCategories({ token, search }),
  });

export const useGetAllExpensesCategoryById = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) =>
  useQuery({
    queryKey: [Query_Keys.GET_ALL_EXPENSES_ONE_CATEGORY, id],
    queryFn: () => getAllExpenseCategoryById({ token, id }),
  });

export const useCreateExpenseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, token }: { token: string; name: string }) =>
      createExpenseCategory({ token, name }),
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
    mutationFn: ({
      name,
      token,
      id,
    }: {
      token: string;
      name: string;
      id: string;
    }) => updateExpenseCategory({ token, name, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES],
      });
    },
  });
};

export const useDeleteExpenseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      deleteExpenseCategory({ token, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_EXPENSES_CATEGORIES],
      });
    },
  });
};
