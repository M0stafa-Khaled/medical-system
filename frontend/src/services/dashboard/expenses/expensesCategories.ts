import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams } from "@/interfaces";
import {
  IExpenseCategoriesRes,
  IAddExpenseCategoryRes,
  IExpenseCategory,
} from "@/interfaces/dashboard/expenses/expenseCategory";

export const getAllExpenseCategories: ({
  token,
  search,
}: IGetWithParams) => Promise<IExpenseCategoriesRes> = async ({
  token,
  search,
}) => {
  const { data } = await axiosInstanceAPI.get("/expenses-categories", {
    params: { q: search },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllExpenseCategoryById: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<{ status: boolean; data: IExpenseCategory }> = async ({
  token,
  id,
}) => {
  const { data } = await axiosInstanceAPI.get(`/expenses-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createExpenseCategory: ({
  token,
  name,
}: {
  token: string;
  name: string;
}) => Promise<IAddExpenseCategoryRes> = async ({ token, name }) => {
  const { data } = await axiosInstanceAPI.post(
    "/expenses-categories",
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const updateExpenseCategory: ({
  token,
  id,
  name,
}: {
  token: string;
  id: string;
  name: string;
}) => Promise<IAddExpenseCategoryRes> = async ({ token, id, name }) => {
  const { data } = await axiosInstanceAPI.post(
    `/expenses-categories/${id}`,
    { name, _method: "put" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteExpenseCategory: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<{ status: boolean; message: string }> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/expenses-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
