import { useGetAllTreasuries } from "@/features/dashboard/treasuries/queriesAndMutations";
import { ITransactionsReportFilter } from "@/features/dashboard/reports/types";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

export const TransactionsFilters = () => {
  const { data: treasuries } = useGetAllTreasuries({});

  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ITransactionsReportFilter = useMemo(
    () => ({
      action: searchParams.get("action") || "",
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      employee: searchParams.get("employee") || "",
      end_at: searchParams.get("end_at") || "",
      start_at: searchParams.get("start_at") || "",
      payment_method: searchParams.get("payment_method") || "",
      status: searchParams.get("status") || "",
      treasury: searchParams.get("treasury") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: ITransactionsReportFilter) => {
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
            label: "محصل",
          },
          {
            value: "0",
            label: "مسترد",
          },
        ]}
      />

      {/* Payment Method */}

      <SelectFilter
        placeholder="وسيلة الدفع"
        handleFilterChange={handleFilterChange}
        value={filters.payment_method}
        filterKey="payment_method"
        options={[
          {
            value: "all",
            label: "الكل",
          },
          {
            value: "cash",
            label: "نقدي",
          },
          {
            value: "visa",
            label: "بطاقة بنكية",
          },
        ]}
      />

      {/* Start Date */}

      <DateFilter
        placeholder="من"
        handleFilterChange={handleFilterChange}
        filterKey="start_at"
        value={filters.start_at}
      />

      {/* End Date */}
      <DateFilter
        placeholder="إلي"
        handleFilterChange={handleFilterChange}
        filterKey="end_at"
        value={filters.end_at}
      />
    </div>
  );
};
