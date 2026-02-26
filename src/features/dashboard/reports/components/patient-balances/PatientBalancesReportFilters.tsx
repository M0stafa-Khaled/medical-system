import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import DateFilter from "@/shared/components/ui/date-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import { IPatientBalancesReportFilter } from "../../types";
import { useGetAllPatients } from "@/features/dashboard/patients/queriesAndMutations";
import InputFilter from "@/shared/components/ui/input-filter";
import useDebounce from "@/shared/hooks/useDebounce";

export const PatientBalancesReportFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [patientSearch, setPatientSearch] = useState("");
  const debouncedSearch = useDebounce(patientSearch, 400);

  const { data: patients } = useGetAllPatients({ search: debouncedSearch });

  const filters: IPatientBalancesReportFilter = useMemo(
    () => ({
      start_at: searchParams.get("start_at") || "",
      end_at: searchParams.get("end_at") || "",
      payment_method: searchParams.get("payment_method") || "",
    }),
    [searchParams]
  );

  const setFilters = (newFilters: IPatientBalancesReportFilter) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === "all") params.delete(key);
      else if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string | null) =>
    setFilters({ ...filters, [key]: value });

  const handlePatientChange = (patientId: string) => {
    const params = new URLSearchParams(searchParams);
    if (patientId && patientId !== "all") {
      params.set("patient_id", patientId);
    } else {
      params.delete("patient_id");
    }
    setSearchParams(params);
  };

  const selectedPatientId = searchParams.get("patient_id") || "";

  return (
    <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {/* Patient search input */}
      <InputFilter
        placeholder="ابحث باسم المريض أو رقم الهاتف"
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
      />

      {/* Patient selector */}
      <SelectFilter
        placeholder="اختر المريض"
        handleFilterChange={(_, value) => handlePatientChange(value || "")}
        value={selectedPatientId}
        filterKey="patient_id"
        options={[
          { value: "all", label: "كل المرضى" },
          ...(patients?.data.items?.length
            ? patients.data.items.map((p) => ({
                value: String(p.id),
                label: p.name,
              }))
            : []),
        ]}
      />

      {/* Payment Method */}
      <SelectFilter
        placeholder="طريقة الدفع"
        handleFilterChange={handleFilterChange}
        value={filters.payment_method}
        filterKey="payment_method"
        options={[
          { value: "all", label: "الكل" },
          { value: "cash", label: "نقدي" },
          { value: "visa", label: "بطاقة بنكية" },
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
