import { IPaginationMeta } from "../../shared/types";
import { IEmployee } from "./employee";
import { IExpenseCategory } from "./expenseCategory";
import { ITreasury } from "./treasury";

export interface ICreateExpense {
  name: string;
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
  created_at: string;
  category: IExpenseCategory;
  treasury: ITreasury;
  employee: IEmployee;
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
  created_at: string | null;
  code: string;
  employee: string;
}

export interface IExpenseCategory {
  id: number;
  name: string;
}

export interface IExpenseCategoriesRes {
  status: true;
  message: string | null;
  data: IExpenseCategory[];
}
