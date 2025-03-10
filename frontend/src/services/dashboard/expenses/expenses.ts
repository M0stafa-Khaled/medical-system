import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetTokenPageSearch } from "@/interfaces";
import {
  ICreateExpense,
  IExpense,
  IExpensesResponse,
} from "@/interfaces/dashboard/expenses/expense";

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
}) => Promise<{ data: IExpense; message: string; status: boolean }> = async ({
  token,
  id,
}) => {
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
  cancelled_info,
}: {
  id: string;
  token: string;
  cancelled_info: string;
}) => Promise<{ status: boolean; message: string }> = async ({
  token,
  cancelled_info,
  id,
}) => {
  const { data } = await axiosInstanceAPI.post(
    `/expenses/${id}/cancel`,
    { cancelled_info },
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
