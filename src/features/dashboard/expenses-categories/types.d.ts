export interface IExpenseCategory {
  id: number;
  name: string;
}

export interface IExpenseCategoriesRes {
  status: true;
  message: string | null;
  data: IExpenseCategory[];
}
