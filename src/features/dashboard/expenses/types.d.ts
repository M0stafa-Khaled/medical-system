import { type IPaginationMeta } from "@/shared/types";
import { type IEmployee } from "../employees/types";
import { type ITreasury } from "@/features/dashboard/treasuries/types";
import { type IExpenseCategory } from "../expenses-categories/types";

export interface ICreateExpense {
  name: string;
  date: string;
  status: string;
  price: number;
  category_id: string;
}

export interface IExpense {
  id: number;
  name: string;
  cancelled_info: string | null;
  price: string;
  status: true;
  code: string;
  date: string;
  category: IExpenseCategory;
  treasury: ITreasury;
  employee: IEmployee;
  created_at: string;
}

export interface IExpensesRes {
  status: boolean;
  message: string | null;
  data: {
    items: IExpense[];
    meta: IPaginationMeta;
  };
}

export interface IExpensesFilter {
  treasury: string;
  status: string;
  date: string | null;
  code: string;
  employee: string;
  sort: string;
}
