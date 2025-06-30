import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  ICreateExpense,
  IExpense,
  IExpensesRes,
} from "@/interfaces/dashboard/expenses";

export const getAllExpenses = async ({
  token,
  page,
  filter,
  sort,
}: IGetWithParams): Promise<IExpensesRes> => {
  const { data } = await axiosAPI.get("/expenses", {
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
  const { data } = await axiosAPI.get(`/expenses/${id}`, {
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
  const { data } = await axiosAPI.post("/expenses", dataForm, {
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
  const { data } = await axiosAPI.post(
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
  const { data } = await axiosAPI.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
