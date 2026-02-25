import { ITransactionsFilter } from "@/features/dashboard/transactions/types";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

export const TransactionsFilters = () => {
  const { data: treasuries } = useGetAllTreasuries({});
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilters = (newFilters: ITransactionsFilter) => {
    const params = new URLSearchParams(searchParams);

    // update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

  const filters: ITransactionsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      action: searchParams.get("action") || "",
      patient: searchParams.get("patient") || "",
      code: searchParams.get("code") || "",
      employee: searchParams.get("employee") || "",
      treasury: searchParams.get("treasury") || "",
      created_at: searchParams.get("created_at") || "",
      status: searchParams.get("status") || "",
    }),
    [searchParams]
  );

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
        placeholder="ابحث باسم الطبيب"
        value={filters.doctor}
        onChange={(e) => handleFilterChange("doctor", e.target.value)}
      />

      <InputFilter
        placeholder="ابحث باسم الخدمة"
        value={filters.action}
        onChange={(e) => handleFilterChange("action", e.target.value)}
      />

      <InputFilter
        placeholder="ابحث باسم الموظف"
        value={filters.employee}
        onChange={(e) => handleFilterChange("employee", e.target.value)}
      />

      <InputFilter
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />

      <SelectFilter
        placeholder="الخزنة"
        handleFilterChange={handleFilterChange}
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
        value={filters.treasury}
      />

      {/* Status */}
      <SelectFilter
        placeholder="الحالة"
        handleFilterChange={handleFilterChange}
        filterKey="status"
        options={[
          {
            label: "الكل",
            value: "all",
          },
          {
            label: "محصل",
            value: "1",
          },
          {
            label: "مسترد",
            value: "0",
          },
        ]}
        value={filters.status}
      />

      <DateFilter
        filterKey="created_at"
        handleFilterChange={handleFilterChange}
        value={filters.created_at}
        placeholder="تاريخ التحصيل"
      />
    </div>
  );
};
