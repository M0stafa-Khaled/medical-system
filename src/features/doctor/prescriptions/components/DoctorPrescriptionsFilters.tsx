import { IPrescriptionsFilter } from "@/features/dashboard/prescriptions/types";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { useGetDoctorClinics } from "@/features/doctor";
import InputFilter from "@/shared/components/ui/input-filter";
import SelectFilter from "@/shared/components/ui/select-filter";
import DateFilter from "@/shared/components/ui/date-filter";

const DoctorPrescriptionsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IPrescriptionsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      clinic: searchParams.get("clinic") || "",
      date: searchParams.get("date") || "",
    }),
    [searchParams]
  );

  const { data: clinics } = useGetDoctorClinics();

  const setFilters = (newFilters: IPrescriptionsFilter) => {
    const params = new URLSearchParams(searchParams);

    // Update each filter param
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
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
        placeholder="ابحث باسم المريض او رقم الهاتف الأول"
        value={filters.patient}
        onChange={(e) => handleFilterChange("patient", e.target.value)}
      />
      {/* Clinic */}

      <SelectFilter
        placeholder="العيادة"
        filterKey="clinic"
        value={filters.clinic}
        handleFilterChange={handleFilterChange}
        options={[
          {
            value: "all",
            label: "الكل",
          },
          ...(clinics?.data.length
            ? clinics.data.map((clinic) => ({
                label: clinic.name,
                value: clinic.name.trim(),
              }))
            : []),
        ]}
      />

      {/* Created Date */}
      <DateFilter
        placeholder="تاريخ الروشتة"
        filterKey="date"
        handleFilterChange={handleFilterChange}
        value={filters.date}
      />
    </div>
  );
};

export default DoctorPrescriptionsFilters;
