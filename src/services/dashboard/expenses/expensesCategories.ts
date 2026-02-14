import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  IExpenseCategoriesRes,
  IExpenseCategory,
} from "@/interfaces/dashboard/expenses";

export const getAllExpenseCategories = async ({
  token,
  search,
}: IGetWithParams): Promise<IExpenseCategoriesRes> => {
  const { data } = await axiosAPI.get("/expenses-categories", {
    params: { ...(search && { q: search }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllExpenseCategoryById = async ({
  token,
  id,
}: {
  id: string;
  token: string;
}): Promise<{ status: boolean; data: IExpenseCategory }> => {
  const { data } = await axiosAPI.get(`/expenses-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createExpenseCategory = async ({
  token,
  name,
}: {
  token: string;
  name: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
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

export const updateExpenseCategory = async ({
  token,
  id,
  name,
}: {
  token: string;
  id: string;
  name: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
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

export const deleteExpenseCategory = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/expenses-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
