import { PERMISSIONS } from "@/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateExpense } from "./CreateExpense";
import { useSearchParams } from "react-router";
import { ExpensesFilters } from "./ExpensesFilters";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";
import { useMemo } from "react";
import { IExpensesFilter } from "../types";

export const ExpensesHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const canCreateExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  const filters: IExpensesFilter = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      created_at: searchParams.get("created_at") || "",
      sort: searchParams.get("sort") || "",
    }),
    [searchParams]
  );
  const setFilters = (newFilters: IExpensesFilter) => {
    const params = new URLSearchParams(searchParams);

    // update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setFilters({
      created_at: null,
      treasury: "",
      status: "",
      code: "",
      employee: "",
      sort: "",
    });
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
          {canCreateExpense && <CreateExpense />}
          <div className="text-lg font-semibold text-black dark:text-white">
            {format(new Date(), "EEEE, d MMMM yyyy", { locale: ar })}
          </div>
        </div>

        <Button
          onClick={handleClearFilters}
          className="flex h-auto items-center gap-2 py-3"
        >
          <Eraser className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>
      <ExpensesFilters filters={filters} setFilters={setFilters} />
    </div>
  );
};
