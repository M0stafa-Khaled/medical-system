import DataTable from "@/components/ui/DataTable";
import DoctorPrescriptionsTableHeader from "./DoctorPrescriptionsTableHeader";
import DoctorPrescriptionsHeader from "./DoctorPrescriptionsHeader";
import DoctorPrescriptionsList from "./DoctorPrescriptionsList";
import TableSkeleton from "@/components/ui/TableSkeleton";
import cookieServices from "@/utils/cookieServices";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";
import { IPrescriptionsFilter } from "@/interfaces/dashboard/prescription";
import { useGetAllDoctorPrescriptions } from "@/lib/react-query/doctor/prescriptions";

const DoctorPrescriptionsTable = () => {
  const token = cookieServices.getToken()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const filters: IPrescriptionsFilter = useMemo(
    () => ({
      doctor: searchParams.get("doctor") || "",
      patient: searchParams.get("patient") || "",
      clinic: searchParams.get("clinic") || "",
      date: searchParams.get("date") || "",
    }),
    [searchParams]
  );

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

  const doctor = useDebounce(filters.doctor, 500);
  const patient = useDebounce(filters.patient, 500);

  const {
    data: prescriptions,
    isLoading,
    isError,
  } = useGetAllDoctorPrescriptions({
    token,
    page,
    filter: {
      ...(filters.doctor && { doctor }),
      ...(filters.patient && { patient }),
      ...(filters.date && { date: filters.date }),
      ...(filters.clinic !== "all" &&
        filters.clinic !== "" && {
          clinic: filters.clinic,
        }),
    },
  });

  useEffect(() => {
    if (prescriptions?.message && !prescriptions.status)
      toast.error(prescriptions.message);
    if (isError) {
      toast.error("حدث خطأ اثناء تحميل البيانات");
      return;
    }
  }, [prescriptions?.message, prescriptions?.status, isError]);

  return (
    <DataTable
      isLoading={isLoading}
      header={
        <DoctorPrescriptionsHeader filters={filters} setFilters={setFilters} />
      }
      tableHeader={<DoctorPrescriptionsTableHeader />}
      list={
        <DoctorPrescriptionsList
          prescriptions={prescriptions?.data?.items || []}
        />
      }
      skeleton={<TableSkeleton columns={4} rows={6} actionButtons={4} />}
      pagination={
        prescriptions?.data && {
          meta: prescriptions.data?.meta,
        }
      }
    />
  );
};

export default DoctorPrescriptionsTable;
