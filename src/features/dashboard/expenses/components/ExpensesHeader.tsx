import { PERMISSIONS } from "@/shared/enums/permissions";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { CreateExpense } from "./CreateExpense";
import { useSearchParams } from "react-router";
import { ExpensesFilters } from "./ExpensesFilters";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { Eraser } from "lucide-react";
import { ar } from "date-fns/locale";

export const ExpensesHeader = () => {
  const [, setSearchParams] = useSearchParams();
  const canCreateExpense = useHasPermission(PERMISSIONS.ADD_EXPENSE);

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="mb-4 space-y-4">
      <div className="my-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center">
          {canCreateExpense && <CreateExpense />}
          <div className="text-lg font-semibold">
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
      <ExpensesFilters />
    </div>
  );
};
