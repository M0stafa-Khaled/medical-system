import cookieServices from "@/shared/utils/cookieServices";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { IExpensesFilter } from "@/features/dashboard/expenses/types";
import { useCallback } from "react";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

interface IProps {
  filters: IExpensesFilter;
  setFilters: (filters: IExpensesFilter) => void;
}
export const ExpensesFilters = ({ filters, setFilters }: IProps) => {
  const token = cookieServices.getToken()!;
  const { data: treasuries } = useGetAllTreasuries({ token });

  const handleFilterChange = useCallback(
    (key: string, value: string | null) =>
      setFilters({ ...filters, [key]: value }),
    [filters, setFilters]
  );

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <InputFilter
        placeholder="ابحث برقم الإيصال"
        value={filters.code}
        onChange={(e) => handleFilterChange("code", e.target.value)}
      />

      <InputFilter
        placeholder="ابحث باسم الموظف"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      {/* Treasuries */}
      <SelectFilter
        placeholder="الخزنة"
        handleFilterChange={handleFilterChange}
        value={filters.treasury}
        filterKey="treasury"
        options={[
          { value: "all", label: "الكل" },
          ...(treasuries?.data.length
            ? treasuries.data.map((t) => ({
                value: t.name.trim(),
                label: t.name,
              }))
            : []),
        ]}
      />

      {/* Status */}
      <SelectFilter
        placeholder="الحالة"
        handleFilterChange={handleFilterChange}
        value={filters.status}
        filterKey="status"
        options={[
          {
            value: "all",
            label: "الكل",
          },
          {
            value: "1",
            label: "معتمد",
          },
          {
            value: "0",
            label: "ملغي",
          },
        ]}
      />

      {/* Created Date */}
      <DateFilter
        placeholder="تاريخ الصرف"
        handleFilterChange={handleFilterChange}
        filterKey="created_at"
        value={filters.created_at}
      />
    </div>
  );
};
