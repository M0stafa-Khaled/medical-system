import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { IExpensesFilter } from "@/features/dashboard/expenses/types";
import { useMemo } from "react";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";
import { useSearchParams } from "react-router";

export const ExpensesFilters = () => {
  const { data: treasuries } = useGetAllTreasuries({});
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IExpensesFilter = useMemo(
    () => ({
      status: searchParams.get("status") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      date: searchParams.get("date") || "",
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

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

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
        filterKey="date"
        value={filters.date}
      />
    </div>
  );
};
