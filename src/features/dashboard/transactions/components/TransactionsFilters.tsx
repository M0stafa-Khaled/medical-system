import { ITransactionsFilter } from "@/features/dashboard/transactions/types";
import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Filter Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
          <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            تصفية النتائج
          </h3>
          <Button
            onClick={() => setSearchParams({})}
            size="default"
            variant="outline"
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">مسح الفلاتر</span>
            <span className="sm:hidden">مسح</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {" "}
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
    </motion.div>
  );
};
