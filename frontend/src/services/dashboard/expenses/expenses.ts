import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  ICreateExpense,
  IExpense,
  IExpensesResponse,
} from "@/interfaces/dashboard/expenses";

export const getAllExpenses = async ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams): Promise<IExpensesResponse> => {
  const { data } = await axiosInstanceAPI.get("/expenses", {
    params: { page, sort, ...(filter && { filter }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getExpenseById = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<{ data: IExpense; message: string; status: boolean }> => {
  const { data } = await axiosInstanceAPI.get(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createExpense = async ({
  token,
  dataForm,
}: {
  token: string;
  dataForm: ICreateExpense;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post("/expenses", dataForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const cancelExpense = async ({
  token,
  cancelled_info,
  id,
}: {
  id: string;
  token: string;
  cancelled_info: string;
}): Promise<IStatusMsg> => {
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

export const deleteExpense = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
