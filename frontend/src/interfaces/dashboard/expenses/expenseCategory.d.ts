export interface IExpenseCategory {
  id: number;
  name: string;
}

export interface ICreateExpenseCategoryRes {
  status: boolean;
  message: string;
}

export interface IExpenseCategoriesRes {
  status: true;
  message: string | null;
  data: IExpenseCategory[];
}
