import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetTokenPageSearch } from "@/interfaces";
import {
  ICreateExpense,
  IExpense,
  IExpensesResponse,
} from "@/interfaces/expense";

export const getAllExpenses: ({
  token,
  page,
  search,
}: IGetTokenPageSearch) => Promise<IExpensesResponse> = async ({
  token,
  page,
  search,
}) => {
  const { data } = await axiosInstanceAPI.get("/expenses", {
    params: { ...(search ? { q: search } : { q: search, page }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getExpenseById: ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => Promise<{ data: IExpense; status: boolean }> = async ({ token, id }) => {
  const { data } = await axiosInstanceAPI.get(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createExpense: ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: ICreateExpense;
}) => Promise<{ message: string; status: boolean }> = async ({
  token,
  dataForm,
}) => {
  const { data } = await axiosInstanceAPI.post("/expenses", dataForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const cancelExpense: ({
  id,
  token,
  description,
}: {
  id: string;
  token: string;
  description: string;
}) => Promise<{ status: boolean; message: string }> = async ({
  token,
  description,
  id,
}) => {
  const { data } = await axiosInstanceAPI.post(
    `/expenses/${id}/cancel`,
    description,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteExpense: ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => Promise<IDeleteRes> = async ({ token, id }) => {
  const { data } = await axiosInstanceAPI.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
